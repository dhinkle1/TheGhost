export type TheGhostEventType =
  | "message"
  | "system"
  | "agent_state_changed"
  | "run"
  | "read"
  | "write"
  | "edit"
  | "run_ipython"
  | "delegate"
  | "browse"
  | "browse_interactive"
  | "reject"
  | "think"
  | "finish"
  | "error"
  | "recall"
  | "mcp"
  | "call_tool_mcp";

interface TheGhostBaseEvent {
  id: number;
  source: "agent" | "user";
  message: string;
  timestamp: string; // ISO 8601
}

export interface TheGhostActionEvent<T extends TheGhostEventType>
  extends TheGhostBaseEvent {
  action: T;
  args: Record<string, unknown>;
}

export interface TheGhostObservationEvent<T extends TheGhostEventType>
  extends TheGhostBaseEvent {
  cause: number;
  observation: T;
  content: string;
  extras: Record<string, unknown>;
}
