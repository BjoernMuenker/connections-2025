import type { PuzzlePersistedState } from './PuzzlePersistedState';

export interface Savegame {
  createdAt: string;
  updatedAt: string;
  userId: string;
  puzzleId: string;
  data: PuzzlePersistedState;
}
