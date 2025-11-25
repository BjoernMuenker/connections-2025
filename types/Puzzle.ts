import type { PuzzleGroup } from './PuzzleGroup';

export type Puzzle = {
  id: string;
  groups: [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup];
  font: 'Inter' | 'DSEG';
};
