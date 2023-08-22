import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DOWN, ISnakeCoord, LEFT, RIGHT, SET_DISALLOWED_DIRECTION, UP } from "../../actions/snake";

export function* moveSaga(params: {
  type: string;
  payload: ISnakeCoord;
}): Generator<
  | PutEffect<{ type: string; payload: ISnakeCoord }>
  | PutEffect<{ type: string; payload: string }>
  | CallEffect<true>
> {
  while (true) {
    yield put({
      type: params.type.split("/")[1],
      payload: params.payload,
    });
    switch (params.type.split("/")[1]) {
      case 'right':
        yield put(SET_DISALLOWED_DIRECTION(LEFT));
        break;

      case LEFT:
        yield put(SET_DISALLOWED_DIRECTION(RIGHT));
        break;

      case UP:
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
    ['move/right', 'move/left', 'move/up', 'move/down'],
    moveSaga
  )
}

export default watcherSagas;