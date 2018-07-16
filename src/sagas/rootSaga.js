// @flow

import { fork, all } from 'redux-saga/effects';
import { watchZundokoButtonClicked, watchFetchZundokoSucceeded } from './zundoko';

export default function* rootSaga(): Generator<any, void, void> {
  yield all([fork(watchZundokoButtonClicked), fork(watchFetchZundokoSucceeded)]);
}
