import { createReducer, current } from '@reduxjs/toolkit';
import { 
  
  ISnakeCoord,
  SET_DISALLOWED_DIRECTION,
  MOVE_RIGHT,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_UP,
  INCREASE_SNAKE,
  RESET_SCORE,
  INCREMENT_SCORE

 } from "../../actions/snake";

export interface IBoardState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
  score: number;
}

export const boardState: IBoardState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: '',
  score: 0
};

const snakeReducer = createReducer(boardState, (builder) => {
  builder
  .addCase(MOVE_RIGHT, (state, action) => {
    let newSnake = [...state.snake];
    newSnake = [{
      x: state.snake[0].x + action.payload.dx,
      y: state.snake[0].y + action.payload.dy,
    }, ...newSnake];
    newSnake.pop();

    return {
      ...state,
      snake: newSnake
    }
  })
  .addCase(MOVE_LEFT, (state, action) => {
    let newSnake = [...state.snake];
    newSnake = [{
      x: state.snake[0].x + action.payload.dx,
      y: state.snake[0].y + action.payload.dy,
    }, ...newSnake];
    newSnake.pop();

    return {
      ...state,
      snake: newSnake
    }
  })
  .addCase(MOVE_DOWN, (state, action) => {
    let newSnake = [...state.snake];
    newSnake = [{
      x: state.snake[0].x + action.payload.dx,
      y: state.snake[0].y + action.payload.dy,
    }, ...newSnake];
    newSnake.pop();

    return {
      ...state,
      snake: newSnake
    }
  })
  .addCase(MOVE_UP, (state, action) => {
    let newSnake = [...state.snake];
    newSnake = [{
      x: state.snake[0].x + action.payload.dx,
      y: state.snake[0].y + action.payload.dy,
    }, ...newSnake];
    newSnake.pop();

    return {
      ...state,
      snake: newSnake
    }
  })
  .addCase(SET_DISALLOWED_DIRECTION,  (state, action) => { 
    return {
      ...state, 
      disallowedDirection: action.payload
    }
  })
  .addCase(INCREASE_SNAKE, (state, action) => {
    const snakeLength = state.snake.length;
    return {
      ...state,
      snake: [
        ...state.snake,
        {
          x: state.snake[snakeLength - 1].x - 20,
          y: state.snake[snakeLength - 1].y - 20
        }
      ]

    }
  })
  .addCase(RESET_SCORE, (state, _) => {
    return { ...state, score: 0 };
  })
  .addCase(INCREMENT_SCORE, (state, _) => {
    return {
      ...state,
      score: state.score + 1,
    };
  })
})

export default snakeReducer;