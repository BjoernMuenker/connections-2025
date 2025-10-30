import type { PuzzleGroupItem } from './PuzzleGroupItem';

export interface PuzzleGroup {
  id: string;
  caption: string;
  items: [PuzzleGroupItem, PuzzleGroupItem, PuzzleGroupItem, PuzzleGroupItem];
}
