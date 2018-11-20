import { fork, ForkEffect } from 'redux-saga/effects';
import { watchZundokoButtonClicked, watchFetchZundokoSucceeded } from './zundoko';

export default function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(watchFetchZundokoSucceeded);
  yield fork(watchZundokoButtonClicked);
}
