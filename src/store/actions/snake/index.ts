import { MoveAction, DisallowedDirection } from './types/index'
import { createAction } from "@reduxjs/toolkit";


function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const MOVE_RIGHT = createAction('move/right', withPayloadType<MoveAction>());
export const MOVE_LEFT = createAction('move/left', withPayloadType<MoveAction>());
export const MOVE_UP = createAction('move/up', withPayloadType<MoveAction>());
export const MOVE_DOWN = createAction('move/down', withPayloadType<MoveAction>());

export const SET_DISALLOWED_DIRECTION = createAction('setDisallowedDirection', withPayloadType<string>());

export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const UP = 'UP';
export const DOWN = 'DOWN';



export const RESET = 'RESET';
export const STOP_GAME = 'STOP_GAME';
export const INCREASE_SNAKE = 'INCREASE_SNAKE';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export interface ISnakeCoord {
  x: number;
  y: number;
}

export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: {
    dx: dx,
    dy: dy
  }
});