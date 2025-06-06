import React from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import EventLogger from "#/utils/event-logger";
import { handleAssistantMessage } from "#/services/actions";
import { showChatError } from "#/utils/error-handler";
import { useRate } from "#/hooks/use-rate";
import { TheGhostParsedEvent } from "#/types/core";
import {
  AssistantMessageAction,
  CommandAction,
  FileEditAction,
  FileWriteAction,
  UserMessageAction,
} from "#/types/core/actions";
import { Conversation } from "#/api/open-hands.types";
import { useUserProviders } from "#/hooks/use-user-providers";

const isTheGhostEvent = (event: unknown): event is TheGhostParsedEvent =>
  typeof event === "object" &&
  event !== null &&
  "id" in event &&
  "source" in event &&
  "message" in event &&
  "timestamp" in event;

const isFileWriteAction = (
  event: TheGhostParsedEvent,
): event is FileWriteAction => "action" in event && event.action === "write";

const isFileEditAction = (
  event: TheGhostParsedEvent,
): event is FileEditAction => "action" in event && event.action === "edit";

const isCommandAction = (event: TheGhostParsedEvent): event is CommandAction =>
  "action" in event && event.action === "run";

const isUserMessage = (
  event: TheGhostParsedEvent,
): event is UserMessageAction =>
  "source" in event &&
  "type" in event &&
  event.source === "user" &&
  event.type === "message";

const isAssistantMessage = (
  event: TheGhostParsedEvent,
): event is AssistantMessageAction =>
  "source" in event &&
  "type" in event &&
  event.source === "agent" &&
  event.type === "message";

const isMessageAction = (
  event: TheGhostParsedEvent,
): event is UserMessageAction | AssistantMessageAction =>
  isUserMessage(event) || isAssistantMessage(event);

export enum WsClientProviderStatus {
  CONNECTED,
  DISCONNECTED,
}

interface UseWsClient {
  status: WsClientProviderStatus;
  isLoadingMessages: boolean;
  events: Record<string, unknown>[];
  send: (event: Record<string, unknown>) => void;
}

const WsClientContext = React.createContext<UseWsClient>({
  status: WsClientProviderStatus.DISCONNECTED,
  isLoadingMessages: true,
  events: [],
  send: () => {
    throw new Error("not connected");
  },
});

interface WsClientProviderProps {
  conversationId: string;
}

interface ErrorArg {
  message?: string;
  data?: ErrorArgData | unknown;
}

interface ErrorArgData {
  msg_id: string;
}

export function updateStatusWhenErrorMessagePresent(data: ErrorArg | unknown) {
  const isObject = (val: unknown): val is object =>
    !!val && typeof val === "object";
  const isString = (val: unknown): val is string => typeof val === "string";
  if (isObject(data) && "message" in data && isString(data.message)) {
    if (data.message === "websocket error" || data.message === "timeout") {
      return;
    }
    let msgId: string | undefined;
    let metadata: Record<string, unknown> = {};

    if ("data" in data && isObject(data.data)) {
      if ("msg_id" in data.data && isString(data.data.msg_id)) {
        msgId = data.data.msg_id;
      }
      metadata = data.data as Record<string, unknown>;
    }

    showChatError({
      message: data.message,
      source: "websocket",
      metadata,
      msgId,
    });
  }
}

export function WsClientProvider({
  conversationId,
  children,
}: React.PropsWithChildren<WsClientProviderProps>) {
  const queryClient = useQueryClient();
  const sioRef = React.useRef<Socket | null>(null);
  const [status, setStatus] = React.useState(
    WsClientProviderStatus.DISCONNECTED,
  );
  const [events, setEvents] = React.useState<Record<string, unknown>[]>([]);
  const lastEventRef = React.useRef<Record<string, unknown> | null>(null);
  const { providers } = useUserProviders();

  const messageRateHandler = useRate({ threshold: 250 });

  function send(event: Record<string, unknown>) {
    if (!sioRef.current) {
      EventLogger.error("WebSocket is not connected.");
      return;
    }
    sioRef.current.emit("oh_user_action", event);
  }

  function handleConnect() {
    setStatus(WsClientProviderStatus.CONNECTED);
  }

  function handleMessage(event: Record<string, unknown>) {
    if (isTheGhostEvent(event)) {
      if (isMessageAction(event)) {
        messageRateHandler.record(new Date().getTime());
      }

      // Invalidate diffs cache when a file is edited or written
      if (
        isFileEditAction(event) ||
        isFileWriteAction(event) ||
        isCommandAction(event)
      ) {
        queryClient.invalidateQueries({
          queryKey: ["file_changes", conversationId],
        });

        // Invalidate file diff cache when a file is edited or written
        if (!isCommandAction(event)) {
          const cachedConversaton = queryClient.getQueryData<Conversation>([
            "user",
            "conversation",
            conversationId,
          ]);
          const clonedRepositoryDirectory =
            cachedConversaton?.selected_repository?.split("/").pop();

          let fileToInvalidate = event.args.path.replace("/workspace/", "");
          if (clonedRepositoryDirectory) {
            fileToInvalidate = fileToInvalidate.replace(
              `${clonedRepositoryDirectory}/`,
              "",
            );
          }

          queryClient.invalidateQueries({
            queryKey: ["file_diff", conversationId, fileToInvalidate],
          });
        }
      }
    }

    setEvents((prevEvents) => [...prevEvents, event]);
    if (!Number.isNaN(parseInt(event.id as string, 10))) {
      lastEventRef.current = event;
    }

    handleAssistantMessage(event);
  }

  function handleDisconnect(data: unknown) {
    setStatus(WsClientProviderStatus.DISCONNECTED);
    const sio = sioRef.current;
    if (!sio) {
      return;
    }
    sio.io.opts.query = sio.io.opts.query || {};
    sio.io.opts.query.latest_event_id = lastEventRef.current?.id;
    updateStatusWhenErrorMessagePresent(data);
  }

  function handleError(data: unknown) {
    setStatus(WsClientProviderStatus.DISCONNECTED);
    updateStatusWhenErrorMessagePresent(data);
  }

  React.useEffect(() => {
    lastEventRef.current = null;
  }, [conversationId]);

  React.useEffect(() => {
    if (!conversationId) {
      throw new Error("No conversation ID provided");
    }

    let sio = sioRef.current;

    const lastEvent = lastEventRef.current;
    const query = {
      latest_event_id: lastEvent?.id ?? -1,
      conversation_id: conversationId,
      providers_set: providers,
    };

    const baseUrl =
      import.meta.env.VITE_BACKEND_BASE_URL || window?.location.host;

    sio = io(baseUrl, {
      transports: ["websocket"],
      query,
    });
    sio.on("connect", handleConnect);
    sio.on("oh_event", handleMessage);
    sio.on("connect_error", handleError);
    sio.on("connect_failed", handleError);
    sio.on("disconnect", handleDisconnect);

    sioRef.current = sio;

    return () => {
      sio.off("connect", handleConnect);
      sio.off("oh_event", handleMessage);
      sio.off("connect_error", handleError);
      sio.off("connect_failed", handleError);
      sio.off("disconnect", handleDisconnect);
    };
  }, [conversationId]);

  React.useEffect(
    () => () => {
      const sio = sioRef.current;
      if (sio) {
        sio.off("disconnect", handleDisconnect);
        sio.disconnect();
      }
    },
    [],
  );

  const value = React.useMemo<UseWsClient>(
    () => ({
      status,
      isLoadingMessages: messageRateHandler.isUnderThreshold,
      events,
      send,
    }),
    [status, messageRateHandler.isUnderThreshold, events],
  );

  return <WsClientContext value={value}>{children}</WsClientContext>;
}

export function useWsClient() {
  const context = React.useContext(WsClientContext);
  return context;
}
