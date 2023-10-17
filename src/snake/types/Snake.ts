type Cell = {
  x: number;
  y: number;
}

export interface ISnake {
  dx: number;
  dy: number;
  cells: Cell[];
  maxCells: number;
  changingDirection: boolean
  foodPosition: Cell
}

