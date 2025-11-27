import type { PuzzlePersistedState } from './PuzzlePersistedState';

export interface Savegame {
  createdAt: string;
  updatedAt: string;
  puzzleId: string;
  data: PuzzlePersistedState;
}
