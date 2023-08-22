import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect, useCallback } from 'react';

import { RootState } from '../../store';
import { 
  makeMove, 
  MOVE_DOWN, 
  MOVE_LEFT, 
  MOVE_RIGHT, 
  MOVE_UP
} from '../../store/actions/snake';

import { 
  IObjectBody, 
  clearBoard, 
  drawObject, 
  generateRandomPosition
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
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context);
    drawObject(context, snake1, '#91C483'); //Draws snake at the required position
		drawObject(context, [position], '#676FA3'); //Draws fruit randomly
  }, [context]);

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