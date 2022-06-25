export type ValueType = -1 | 0 | 1;
export type ChessType = -1 | 1;
export type GameDataType = ValueType[][];
export interface GameResult {
  rowResult: number[];
  colResult: number[];
  forwardResult: number;
  backwardResult: number;
}