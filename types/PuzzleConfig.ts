export type PuzzleConfig = {
  id: string;
  unlocksAt: number;
  groups: [
    { caption: string; items: [string, string, string, string] },
    { caption: string; items: [string, string, string, string] },
    { caption: string; items: [string, string, string, string] },
    { caption: string; items: [string, string, string, string] }
  ];
};
