// @flow

import { call, fork, put, take } from 'redux-saga/effects';
import { getZundoko } from '../services/apis';
import { ZUNDOKO_BUTTON_CLICKED, ZUNDOKO_FETCH_SUCCEEDED } from '../actions/actionTypes';
import { zundokoFetchSucceeded, zundokoFetchFailed, kiyoshied } from '../actions/actions';

function* fetchZundoko() {
  try {
    const response = yield call(getZundoko);
    const payload = response.data;
    const meta = { statusCode: response.status, statusText: response.statusText };
    yield put(zundokoFetchSucceeded(payload, meta));
  } catch (ex) {
    yield put(zundokoFetchFailed(ex));
  }
}

export function* watchZundokoButtonClicked(): Generator<any, void, Object> {
  while (true) {
    const action = yield take(ZUNDOKO_BUTTON_CLICKED);
    yield fork(fetchZundoko, action);
  }
}

let numZuns = 0;
function* evaluateKiyoshi(action) {
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

export function* watchFetchZundokoSucceeded(): Generator<any, void, Object> {
  while (true) {
    const action = yield take(ZUNDOKO_FETCH_SUCCEEDED);
    yield fork(evaluateKiyoshi, action);
  }
}
