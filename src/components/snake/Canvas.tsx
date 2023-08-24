import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect, useCallback } from 'react';

import { RootState } from '../../store';
import { 
  INCREASE_SNAKE,
  makeMove, 
  STOP_GAME,
} from '../../store/actions/snake';

import { 
  IObjectBody, 
  clearBoard, 
  drawObject, 
  generateRandomPosition,
  hasSnakeCollided
} from '../../utils/snake';

export interface ICanvasBoard {
  height: number;
  width: number;
};


const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const dispatch = useDispatch();
	const snake1 = useSelector((state: RootState) => state.snakeReducer.snake);
  const disallowedDirection = useSelector((state: RootState) => state.snakeReducer.disallowedDirection);
  
  const [position, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height -20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  
  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== 'RIGHT') {
        dispatch(makeMove(dx, dy, 'move/right'));
      }

      if (dx < 0 && dy === 0 && ds !== 'LEFT') {
        dispatch(makeMove(dx, dy, 'move/left'));
      }

      if (dx === 0 && dy < 0 && ds !== 'UP') {
        dispatch(makeMove(dx, dy, 'move/up'));
      }

      if (dx === 0 && dy > 0 && ds !== 'DOWN') {
        dispatch(makeMove(dx, dy, 'move/down'));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if(disallowedDirection) {
        switch (event.key) {
          case 'w':
            moveSnake(0, -20, disallowedDirection);
            break;
          case 's':
            moveSnake(0, 20, disallowedDirection);
            break;
          case 'a':
            moveSnake(-20, 0, disallowedDirection);
            break;
          case 'd':
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== 'LEFT' &&
          disallowedDirection !== 'UP' &&
          disallowedDirection !== 'DOWN' &&
          event.key === 'd'
        )
        moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  )

  useEffect(() => {
    if(isConsumed) {
      const fruitPosition = generateRandomPosition(width - 20, height - 20);
      setPos(fruitPosition);
      setIsConsumed(false);

      dispatch(INCREASE_SNAKE());
    }
  }, [isConsumed, position, height, width, dispatch]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context);
    drawObject(context, snake1, '#91C483'); //Draws snake at the required position
		drawObject(context, [position], '#676FA3'); //Draws fruit randomly

     //When the object is consumed
     if (snake1[0].x === position?.x && snake1[0].y === position?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= 0 ||
      snake1[0].y <= 0 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      console.log(STOP_GAME.type);
      dispatch(STOP_GAME);
    }
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, position, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyEvents);
    return () => {
      window.removeEventListener('keypress', handleKeyEvents);
    }
  }, [disallowedDirection, handleKeyEvents]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '3px solid black',
      }}
      height={height}
      width={width}
    />
  );
};

export default CanvasBoard;