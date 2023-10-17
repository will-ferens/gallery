import { IGameState } from '../types/GameState';
import { INITIAL_SNAKE } from '../constants/initial-snake';
import { SNAKE_HEX } from '../constants/colors';
import { ISnake } from '../types/Snake';
import { generateRandom } from '../util/generate-random';

export class Snake {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private state: IGameState;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d');
    this.state = {
      snake: {
        dx: 20,
        dy: 0,
        cells: INITIAL_SNAKE,
        maxCells: 4,
        changingDirection: false,
        foodPosition: {
          x: 0,
          y: 0 
        }
      },
      score: 0,
    }
  }
  private clearBoard(context: CanvasRenderingContext2D,) {
    context.clearRect(0,0,this.canvas.width,this.canvas.height);
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

  private moveSnake() {
    const { snake } = this.state;
    const head = {x: snake.cells[0].x + snake.dx, y: snake.cells[0].y + snake.dy};
    snake.cells.unshift(head);
    snake.cells.pop();
  }

  private spawnFood() {
    const { snake } = this.state;
    snake.foodPosition.x = generateRandom(0, this.canvas.width - 20);
    snake.foodPosition.y = generateRandom(0, this.canvas.height - 20);

    
  }
  private gameLoop() {
    if(this.context) {
      this.state.snake.changingDirection = false;
      this.clearBoard(this.context);
      this.spawnFood();
      this.moveSnake();
      this.drawObject(this.context, this.state.snake.cells, SNAKE_HEX);
    }
    setTimeout(this.gameLoop.bind(this), 300);
  }

  public start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  public handleInput() {
    const handleKeyEvents = (event: KeyboardEvent) => {
      const { snake } = this.state;
      
      if(snake.changingDirection) {
        return
      }
      
      snake.changingDirection = true;

      const goingUp = snake.dy === -20;
      const goingDown = snake.dy === 20;
      const goingRight = snake.dx === 20;  
      const goingLeft = snake.dx === -20;


      switch (event.key) { 
        case 'w':
          if(!goingDown) {
            snake.dx = 0;
            snake.dy = -20;
          }
          break
        case 'd':
          if(!goingLeft) {
            snake.dx = 20;
            snake.dy = 0;
          }
          break
        case 's':
          if(!goingUp) {
            snake.dx = 0;
            snake.dy = 20;
          }
          break
        case 'a':
          if(!goingRight) {
            snake.dx = -20;
            snake.dy = 0;
          }
          break
        default:
          return
      }
    }
    window.addEventListener('keypress', handleKeyEvents);
  }
}