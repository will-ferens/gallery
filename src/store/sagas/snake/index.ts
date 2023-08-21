import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DOWN, ISnakeCoord, LEFT, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, RIGHT, setDisallowedDirection, UP } from "../../actions/snake";

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
      type: params.type,
      payload: params.payload
    });

    switch (params.type) { 
      case RIGHT:
        yield put(setDisallowedDirection(LEFT));
        break;
      case LEFT:
        yield put(setDisallowedDirection(RIGHT));
        break;
      case UP:
        yield put(setDisallowedDirection(DOWN));
        break;
      case DOWN:
        yield put(setDisallowedDirection(UP));
        break;
    }
    yield delay(100);
  }
}

function* watcherSagas() {
  yield takeLatest(
    [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN],
    moveSaga
  )
}

export default watcherSagas;