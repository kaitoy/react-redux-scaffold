// @flow

import { fork } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { watchZundokoButtonClicked, watchFetchZundokoSucceeded } from './zundoko';

export default function* rootSaga(): Saga<void> {
  yield fork(watchFetchZundokoSucceeded);
  yield fork(watchZundokoButtonClicked);
}
