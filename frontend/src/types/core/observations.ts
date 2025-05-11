import { AgentState } from "../agent-state";
import { TheGhostObservationEvent } from "./base";

export interface AgentStateChangeObservation
  extends TheGhostObservationEvent<"agent_state_changed"> {
  source: "agent";
  extras: {
    agent_state: AgentState;
  };
}

export interface CommandObservation extends TheGhostObservationEvent<"run"> {
  source: "agent";
  extras: {
    command: string;
    hidden?: boolean;
    metadata: Record<string, unknown>;
  };
}

export interface IPythonObservation
  extends TheGhostObservationEvent<"run_ipython"> {
  source: "agent";
  extras: {
    code: string;
  };
}

export interface DelegateObservation
  extends TheGhostObservationEvent<"delegate"> {
  source: "agent";
  extras: {
    outputs: Record<string, unknown>;
  };
}

export interface BrowseObservation extends TheGhostObservationEvent<"browse"> {
  source: "agent";
  extras: {
    url: string;
    screenshot: string;
    error: boolean;
    open_page_urls: string[];
    active_page_index: number;
    dom_object: Record<string, unknown>;
    axtree_object: Record<string, unknown>;
    extra_element_properties: Record<string, unknown>;
    last_browser_action: string;
    last_browser_action_error: unknown;
    focused_element_bid: string;
  };
}

export interface BrowseInteractiveObservation
  extends TheGhostObservationEvent<"browse_interactive"> {
  source: "agent";
  extras: {
    url: string;
    screenshot: string;
    error: boolean;
    open_page_urls: string[];
    active_page_index: number;
    dom_object: Record<string, unknown>;
    axtree_object: Record<string, unknown>;
    extra_element_properties: Record<string, unknown>;
    last_browser_action: string;
    last_browser_action_error: unknown;
    focused_element_bid: string;
  };
}

export interface WriteObservation extends TheGhostObservationEvent<"write"> {
  source: "agent";
  extras: {
    path: string;
    content: string;
  };
}

export interface ReadObservation extends TheGhostObservationEvent<"read"> {
  source: "agent";
  extras: {
    path: string;
    impl_source: string;
  };
}

export interface EditObservation extends TheGhostObservationEvent<"edit"> {
  source: "agent";
  extras: {
    path: string;
    diff: string;
    impl_source: string;
  };
}

export interface ErrorObservation extends TheGhostObservationEvent<"error"> {
  source: "user";
  extras: {
    error_id?: string;
  };
}

export interface AgentThinkObservation
  extends TheGhostObservationEvent<"think"> {
  source: "agent";
  extras: {
    thought: string;
  };
}

export interface MicroagentKnowledge {
  name: string;
  trigger: string;
  content: string;
}

export interface RecallObservation extends TheGhostObservationEvent<"recall"> {
  source: "agent";
  extras: {
    recall_type?: "workspace_context" | "knowledge";
    repo_name?: string;
    repo_directory?: string;
    repo_instructions?: string;
    runtime_hosts?: Record<string, number>;
    additional_agent_instructions?: string;
    date?: string;
    microagent_knowledge?: MicroagentKnowledge[];
  };
}

export interface MCPObservation extends TheGhostObservationEvent<"mcp"> {
  source: "agent";
  extras: {
    // Add any specific fields for MCP observations
  };
}

export type TheGhostObservation =
  | AgentStateChangeObservation
  | AgentThinkObservation
  | CommandObservation
  | IPythonObservation
  | DelegateObservation
  | BrowseObservation
  | BrowseInteractiveObservation
  | WriteObservation
  | ReadObservation
  | EditObservation
  | ErrorObservation
  | RecallObservation
  | MCPObservation;
