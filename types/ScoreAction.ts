import type { ScoreActionId } from './ScoreActionId';

export interface ScoreAction {
  id: ScoreActionId;
  name: string;
  score: number;
}
