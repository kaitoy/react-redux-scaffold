// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export default function configureStore(initialState: Object = {}) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
