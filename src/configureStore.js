// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { logger } from 'redux-logger';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export default function configureStore(initialState: Object = {}) {
  const middlewares = [];
  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }
  middlewares.push(routerMiddleware(history));
  middlewares.push(sagaMiddleware);

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(...middlewares),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
