import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DOWN, ISnakeCoord, LEFT, makeMove, RIGHT, SET_DISALLOWED_DIRECTION, UP, RESET, STOP_GAME } from "../../actions/snake";
// TODO Change arguments for 'makeMove' to include type: string payload: {}
export function* moveSaga(params: {
  type: string;
  payload: ISnakeCoord;
}): Generator<
  | PutEffect<{ type: string; payload: ISnakeCoord }>
  | PutEffect<{ type: string; payload: string }>
  | PutEffect<{ type: string; payload: string }>
  | CallEffect<true>
> {
  while (params.type !== 'reset/game' && params.type !== 'stop/game') {
    console.log(params.type)
    yield put({
      type: params.type.split("/")[1].toUpperCase(),
      payload: params.payload,
    });
    switch (params.type.split("/")[1].toUpperCase()) {
      case RIGHT:
        yield put(SET_DISALLOWED_DIRECTION(LEFT));
        break;

      case LEFT:
        yield put(SET_DISALLOWED_DIRECTION(RIGHT));
        break;

      case UP:
        // yield put(makeMove(0, -20, 'move/down'));
        yield put(SET_DISALLOWED_DIRECTION(DOWN));
        break;

      case DOWN:
        yield put(SET_DISALLOWED_DIRECTION(UP));
        break;
    }
    yield delay(100);
  }
}


function* watcherSagas() {
  yield takeLatest(
    ['move/right', 'move/left', 'move/up', 'move/down', 'stop/game'],
    moveSaga
  )
}

export default watcherSagas;