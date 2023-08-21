import { createReducer } from '@reduxjs/toolkit';
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

const snakeReducer = (state = boardState, action: any) => {
  switch(action) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];
      newSnake = [{
        x: state.snake[0].x + action.payload[0],
        y: state.snake[0].y + action.payload[1],
      }, ...newSnake];
      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    }
    case SET_DISALLOWED_DIRECTION:
      return { ...state, disallowedDirection: action.payload };
    default:
      return state;
  }
 
}

// const snakeReducer = createReducer(boardState, (builder) => {
//   builder
//   .addCase(MOVE_RIGHT, (state, action) => {
//     let newSnake = [...state.snake];
//     newSnake = [{
//       x: state.snake[0].x + action.payload[0],
//       y: state.snake[0].y + action.payload[1],
//     }, ...newSnake];
//     newSnake.pop();
//     return {... state}
//   })
// })

export default snakeReducer