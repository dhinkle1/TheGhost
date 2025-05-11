import { PayloadAction } from "@reduxjs/toolkit";
import { TheGhostObservation } from "./types/core/observations";
import { TheGhostAction } from "./types/core/actions";

export type Message = {
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  imageUrls?: string[];
  type?: "thought" | "error" | "action";
  success?: boolean;
  pending?: boolean;
  translationID?: string;
  eventID?: number;
  observation?: PayloadAction<TheGhostObservation>;
  action?: PayloadAction<TheGhostAction>;
};
