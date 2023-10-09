// import { handleInput } from './handle-input';
// import { drawObject } from './draw-object';
import { IGameState } from '../types/GameState';
import { INITIAL_SNAKE } from '../constants/initial-snake';
import { SNAKE_HEX } from '../constants/colors';
import { GRID_SIZE } from '../constants/grid-size';
import { ISnake } from '../types/Snake';

export class Snake {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private lastFrameTime: number;
  private fps: number;
  private state: IGameState;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d');
    this.lastFrameTime = 0;
    this.fps = 15;
    this.state = {
      snake: {
        x:580,
        y: 300,
        dx: GRID_SIZE,
        dy: 0,
        cells: INITIAL_SNAKE,
        maxCells: 4
      },
      score: 0,
    }
  }

  private drawObject(
    context: CanvasRenderingContext2D,
    objectBody: ISnake['cells'],
    fillColor: string,
    strokeStyle = '#146356'
  ) {
    if(context) {
      objectBody.forEach((obj) => {
        context.fillStyle = fillColor;
        context.strokeStyle = strokeStyle;
        context?.fillRect(obj.x, obj.y, 20, 20);
        context?.strokeRect(obj.x, obj.y, 20, 20);
      });
    }
  }

  private moveSnake () {
    
  }

  private handleInput() {
    const handleKeyEvents = (event: KeyboardEvent) => {
      switch (event.key) { 
        case 'w':
          this.state.snake.dy = -GRID_SIZE;
          break
      }
    }
    window.addEventListener('keypress', handleKeyEvents);
  }
  private gameLoop(currentTime: number) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = currentTime;
    }

    const elapsed = currentTime - this.lastFrameTime;
    const frameDuration = 1000 / this.fps;

    if (elapsed >= frameDuration && this.context) {
      this.lastFrameTime = currentTime;
    }

    requestAnimationFrame(this.gameLoop.bind(this));
    if(this.context) {
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
      const { snake } = this.state
      snake.x += snake.dx;
      snake.y += snake.dy;
      this.drawObject(this.context, this.state.snake.cells, SNAKE_HEX);
    }

  }

  public start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}