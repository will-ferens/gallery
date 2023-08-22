import { createReducer, current } from '@reduxjs/toolkit';
import { 
  RIGHT,
  UP,
  DOWN, 
  LEFT,
  makeMove, 
  ISnakeCoord,
  SET_DISALLOWED_DIRECTION,
  MOVE_RIGHT,
 } from "../../actions/snake";

export interface IBoardState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
}

export const boardState: IBoardState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: ''
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
  .addCase(SET_DISALLOWED_DIRECTION,  (state, action) => { 
    return {
      ...state, 
      disallowedDirection: action.payload
    }
  })
})

export default snakeReducer;