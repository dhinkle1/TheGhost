import { TheGhostAction } from "./actions";
import { TheGhostObservation } from "./observations";
import { TheGhostVariance } from "./variances";

export type TheGhostParsedEvent =
  | TheGhostAction
  | TheGhostObservation
  | TheGhostVariance;
