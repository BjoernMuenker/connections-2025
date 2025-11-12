import type { Puzzle } from './Puzzle';
import type { PuzzleGroup } from './PuzzleGroup';
import type { PuzzleGroupItem } from './PuzzleGroupItem';
import type { PuzzleGroupItemId } from './PuzzleGroupItemId';
import type { PuzzlePersistedState } from './PuzzlePersistedState';

export interface PuzzleState extends PuzzlePersistedState {
  selected: PuzzleGroupItemId[];
  groups: [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup];
  items: PuzzleGroupItem[];
}
