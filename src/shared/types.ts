export type BoxCorrectness = 'correct' | 'almost' | 'wrong';

export interface IBox {
  available: boolean;
  value: string;
  correctness: BoxCorrectness;
}

export type IGrid = Array<Array<IBox>>;
