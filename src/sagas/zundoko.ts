import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
import { getZundoko } from '../services/apis';
import { ZUNDOKO_BUTTON_CLICKED, ZUNDOKO_FETCH_SUCCEEDED } from '../actions/actionTypes';
import {
  zundokoFetchSucceeded,
  zundokoFetchFailed,
  kiyoshied,
  ZundokoFetchSucceeded,
  ZundokoFetchFailed,
  Kiyoshied,
} from '../actions/actions';

function* fetchZundoko(): Iterable<
  CallEffect | PutEffect<ZundokoFetchSucceeded | ZundokoFetchFailed>
> {
  try {
    const response = yield call(getZundoko);
    const payload = response.data;
    const meta = { statusCode: response.status, statusText: response.statusText };
    yield put(zundokoFetchSucceeded(payload, meta));
  } catch (ex) {
    yield put(zundokoFetchFailed(ex));
  }
}

export function* watchZundokoButtonClicked(): Iterable<ForkEffect> {
  yield takeEvery(ZUNDOKO_BUTTON_CLICKED, fetchZundoko);
}

let numZuns = 0;
function* evaluateKiyoshi(action: ZundokoFetchSucceeded): Iterable<PutEffect<Kiyoshied>> {
  if (action.payload.zundoko === 'zun') {
    numZuns += 1;
    return;
  }

  const currentNumZuns = numZuns;
  numZuns = 0;
  if (currentNumZuns === 4) {
    yield put(kiyoshied());
  }
}

export function* watchFetchZundokoSucceeded(): Iterable<ForkEffect> {
  yield takeEvery(ZUNDOKO_FETCH_SUCCEEDED, evaluateKiyoshi);
}
