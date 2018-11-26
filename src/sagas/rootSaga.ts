import { fork } from 'redux-saga/effects';
import { watchZundokoButtonClicked, watchFetchZundokoSucceeded } from './zundoko';

export default function* rootSaga() {
  yield fork(watchFetchZundokoSucceeded);
  yield fork(watchZundokoButtonClicked);
}
