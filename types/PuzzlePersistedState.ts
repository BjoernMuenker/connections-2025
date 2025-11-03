export interface PuzzlePersistedState {
  id: string;
  solved: string[];
  remainingMistakes: number;
  guesses: string[];
  won: boolean;
}
