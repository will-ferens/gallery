// import { drawObject } from "./util/draw-object";
// import { loop } from './util/game-loop';
import { Snake } from "./game/Snake";

export const snake = (canvas: HTMLCanvasElement) => {
  canvas.height = 600;
  canvas.width = 1200;
  const context = canvas.getContext('2d');
  if(context) {
    const snakeGame = new Snake(canvas);
    snakeGame.handleInput();
    snakeGame.start();
  }
}