import { ISnakeCoord } from "./SnakeCoord";
export interface IGameState {
  snake: ISnakeCoord[] | [];
  direction: string;
  disallowedDirection: string;
  score: number;
}