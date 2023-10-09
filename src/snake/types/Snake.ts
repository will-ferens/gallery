type SnakeCell = {
  x: number;
  y: number;
}
export interface ISnake {
  x: number;
  y: number;
  dx: number;
  dy: number;
  cells: SnakeCell[];
  maxCells: 4;
}

