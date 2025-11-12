import type { ScoreAction } from './ScoreAction';
import type { ScoreActionId } from './ScoreActionId';

export type PuzzleScore = Partial<Record<ScoreActionId, { amount: number; single: number; total: number }>>;
