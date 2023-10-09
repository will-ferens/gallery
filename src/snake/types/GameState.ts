import { ISnake } from "./Snake";
export interface IGameState {
  snake: ISnake;
  score: number;
}