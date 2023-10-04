import { handleInput } from "./util/handle-input";
import { drawObject } from "./util/draw-object";
import { IGameState } from "./types/GameState";

const snake1 = [
  { x: 580, y: 300 },
  { x: 560, y: 300 },
  { x: 540, y: 300 },
  { x: 520, y: 300 },
  { x: 500, y: 300 },
]

const gameState : IGameState = {
  direction: 'RIGHT',
  disallowedDirection: 'LEFT',
  snake: snake1,
  score: 0,
}

export const snake = (canvas: HTMLCanvasElement) => {
  canvas.height = 600;
  canvas.width = 1000;
  const context = canvas.getContext('2d');
  if(context) {
    drawObject(context, snake1, '#42FF4A');
  }
  handleInput(gameState);
}