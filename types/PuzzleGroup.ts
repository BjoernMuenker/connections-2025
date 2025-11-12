import type { PuzzleGroupId } from './PuzzleGroupId';
import type { PuzzleGroupItem } from './PuzzleGroupItem';

export interface PuzzleGroup {
  id: PuzzleGroupId;
  caption: string;
  items: [PuzzleGroupItem, PuzzleGroupItem, PuzzleGroupItem, PuzzleGroupItem];
}
