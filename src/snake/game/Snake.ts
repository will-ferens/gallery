import { IGameState } from '../types/GameState';
import { INITIAL_SNAKE } from '../constants/initial-snake';
import { SNAKE_HEX } from '../constants/colors';
import { ISnake } from '../types/Snake';
import { generateRandom } from '../util/generate-random';
import { snake } from '..';

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
    fillColor: string,
    strokeStyle: string,
    objectBody: ISnake['cells'] | ISnake['foodPosition'],
  ) {
      if(!context) return;
      const draw = (obj: { x: number, y: number }) => {
        context.fillStyle = fillColor;
        context.strokeStyle = strokeStyle;
        context?.fillRect(obj.x, obj.y, 20, 20);
        context?.strokeRect(obj.x, obj.y, 20, 20);
      }
      if(Array.isArray(objectBody)) {
        objectBody.forEach(draw);
      } else {
        draw(objectBody);
      }
  }

  private moveSnake() {
    const { cells } = this.state.snake;
    const { snake } = this.state;
    const head = {x: cells[0].x + snake.dx, y: cells[0].y + snake.dy};
    cells.unshift(head);
    const foodCollision = cells[0].x === snake.foodPosition.x && cells[0].y === snake.foodPosition.y;
    if(foodCollision) {
      this.state.score += 10;
      this.spawnFood();
    } else {
      cells.pop();
    }
  }

  private gameLoop() {
    if(this.context) {
      if (this.hasGameEnded()) return;

      this.state.snake.changingDirection = false;
      this.clearBoard(this.context);
      this.moveSnake();
      this.drawObject(this.context, SNAKE_HEX, '#146356', this.state.snake.cells,);
      this.drawObject(this.context, SNAKE_HEX, '#146356', this.state.snake.foodPosition,);
    }
    setTimeout(this.gameLoop.bind(this), 300);
  }

  private hasGameEnded() {
    const { cells } = this.state.snake;

    for (let i = cells.length; i < cells.length; i++) {
      const hasCollided = cells[i].x === cells[0].x && cells[i].y === cells[0].y;
      if(hasCollided) return true
    }
    const hitLeftWall = cells[0].x < 0;  
    const hitRightWall = cells[0].x > this.canvas.width - 10;
    const hitToptWall = cells[0].y < 0;
    const hitBottomWall = cells[0].y > this.canvas.height - 10;

    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
  }

  public start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  public spawnFood() {
    const { snake } = this.state;
    snake.foodPosition.x = generateRandom(0, this.canvas.width - 20);
    snake.foodPosition.y = generateRandom(0, this.canvas.height - 20);
    if(this.context)
    snake.cells.forEach(cell => {
      const hasEaten = cell.x === snake.foodPosition.x && cell.y === snake.foodPosition.y;
      if(hasEaten) this.spawnFood();
    });
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