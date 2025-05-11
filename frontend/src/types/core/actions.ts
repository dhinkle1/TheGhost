import { TheGhostActionEvent } from "./base";
import { ActionSecurityRisk } from "#/state/security-analyzer-slice";

export interface UserMessageAction extends TheGhostActionEvent<"message"> {
  source: "user";
  args: {
    content: string;
    image_urls: string[];
  };
}

export interface SystemMessageAction extends TheGhostActionEvent<"system"> {
  source: "agent";
  args: {
    content: string;
    tools: Array<Record<string, unknown>> | null;
    openhands_version: string | null;
    agent_class: string | null;
  };
}

export interface CommandAction extends TheGhostActionEvent<"run"> {
  source: "agent";
  args: {
    command: string;
    security_risk: ActionSecurityRisk;
    confirmation_state: "confirmed" | "rejected" | "awaiting_confirmation";
    thought: string;
    hidden?: boolean;
  };
}

export interface AssistantMessageAction extends TheGhostActionEvent<"message"> {
  source: "agent";
  args: {
    thought: string;
    image_urls: string[] | null;
    wait_for_response: boolean;
  };
}

export interface IPythonAction extends TheGhostActionEvent<"run_ipython"> {
  source: "agent";
  args: {
    code: string;
    security_risk: ActionSecurityRisk;
    confirmation_state: "confirmed" | "rejected" | "awaiting_confirmation";
    kernel_init_code: string;
    thought: string;
  };
}

export interface ThinkAction extends TheGhostActionEvent<"think"> {
  source: "agent";
  args: {
    thought: string;
  };
}

export interface FinishAction extends TheGhostActionEvent<"finish"> {
  source: "agent";
  args: {
    final_thought: string;
    task_completed: "success" | "failure" | "partial";
    outputs: Record<string, unknown>;
    thought: string;
  };
}

export interface DelegateAction extends TheGhostActionEvent<"delegate"> {
  source: "agent";
  timeout: number;
  args: {
    agent: "BrowsingAgent";
    inputs: Record<string, string>;
    thought: string;
  };
}

export interface BrowseAction extends TheGhostActionEvent<"browse"> {
  source: "agent";
  args: {
    url: string;
    thought: string;
  };
}

export interface BrowseInteractiveAction
  extends TheGhostActionEvent<"browse_interactive"> {
  source: "agent";
  timeout: number;
  args: {
    browser_actions: string;
    thought: string | null;
    browsergym_send_msg_to_user: string;
  };
}

export interface FileReadAction extends TheGhostActionEvent<"read"> {
  source: "agent";
  args: {
    path: string;
    thought: string;
    security_risk: ActionSecurityRisk | null;
    impl_source?: string;
    view_range?: number[] | null;
  };
}

export interface FileWriteAction extends TheGhostActionEvent<"write"> {
  source: "agent";
  args: {
    path: string;
    content: string;
    thought: string;
  };
}

export interface FileEditAction extends TheGhostActionEvent<"edit"> {
  source: "agent";
  args: {
    path: string;
    command?: string;
    file_text?: string | null;
    view_range?: number[] | null;
    old_str?: string | null;
    new_str?: string | null;
    insert_line?: number | null;
    content?: string;
    start?: number;
    end?: number;
    thought: string;
    security_risk: ActionSecurityRisk | null;
    impl_source?: string;
  };
}

export interface RejectAction extends TheGhostActionEvent<"reject"> {
  source: "agent";
  args: {
    thought: string;
  };
}

export interface RecallAction extends TheGhostActionEvent<"recall"> {
  source: "agent";
  args: {
    recall_type: "workspace_context" | "knowledge";
    query: string;
    thought: string;
  };
}

export interface MCPAction extends TheGhostActionEvent<"call_tool_mcp"> {
  source: "agent";
  args: {
    name: string;
    arguments: Record<string, unknown>;
    thought?: string;
  };
}

export type TheGhostAction =
  | UserMessageAction
  | AssistantMessageAction
  | SystemMessageAction
  | CommandAction
  | IPythonAction
  | ThinkAction
  | FinishAction
  | DelegateAction
  | BrowseAction
  | BrowseInteractiveAction
  | FileReadAction
  | FileEditAction
  | FileWriteAction
  | RejectAction
  | RecallAction
  | MCPAction;
