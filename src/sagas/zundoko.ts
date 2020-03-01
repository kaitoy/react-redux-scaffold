import { Action } from 'redux';
import { call, put, takeEvery, SagaReturnType } from 'redux-saga/effects';
import { getZundoko } from '../services/apis';
import {
  zundokoButtonClicked,
  zundokoFetchSucceeded,
  zundokoFetchFailed,
  kiyoshied,
} from '../actions/actions';

export function* fetchZundoko() {
  try {
    const response: SagaReturnType<typeof getZundoko> = yield call(getZundoko);
    const payload = { zundoko: response.data.uuid.match(/^[0-9]/) ? 'ズン' : 'ドコ' };
    yield put(zundokoFetchSucceeded(payload));
  } catch (ex) {
    yield put(zundokoFetchFailed(ex));
  }
}

export function* watchZundokoButtonClicked() {
  yield takeEvery(({ type }: Action<ReturnType<typeof zundokoButtonClicked>['type']>) => {
    return type === 'ZUNDOKO_BUTTON_CLICKED';
  }, fetchZundoko);
}

let numZuns = 0;
function* evaluateKiyoshi(action: ReturnType<typeof zundokoFetchSucceeded>) {
  if (action.payload.zundoko === 'ズン') {
    numZuns += 1;
    return;
  }

  const currentNumZuns = numZuns;
  numZuns = 0;
  if (currentNumZuns === 4) {
    yield put(kiyoshied());
  }
}

export function* watchFetchZundokoSucceeded() {
  yield takeEvery(
    ({ type }: Action<ReturnType<typeof zundokoFetchSucceeded>['type']>) =>
      type === 'ZUNDOKO_FETCH_SUCCEEDED',
    evaluateKiyoshi,
  );
}
