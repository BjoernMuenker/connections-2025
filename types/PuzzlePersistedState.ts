import type { PuzzleGroupId } from './PuzzleGroupId';
import type { PuzzleGroupItemId } from './PuzzleGroupItemId';

export interface PuzzlePersistedState {
  id: string;
  solved: PuzzleGroupId[];
  remainingMistakes: number;
  guesses: PuzzleGroupItemId[][];
  won: boolean;
}
