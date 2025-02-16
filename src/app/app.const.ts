export type TokenType = "❌" | "⭕️" | " "
export interface TallyType {
  x: number,
  o: number,
  draw: number,
}
export interface DialogData {
  resetWins: () => void,
}

export const emptyTally = {
  x: 0,
  o: 0,
  draw: 0,
}
export const emptyBoard: TokenType[] = [
  " ", " ", " ",
  " ", " ", " ",
  " ", " ", " ",
];
export const winCombos = [
  [0,1,2],  // Top row
  [3,4,5],  // Middle row
  [6,7,8],  // Bottom row
  [0,3,6],  // Left column
  [1,4,7],  // Middle column
  [2,5,8],  // Right column
  [2,4,6],  // Left diagonal
  [0,4,8]   // Right diagonal
];
