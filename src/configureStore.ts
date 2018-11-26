import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { logger } from 'redux-logger';
import rootSaga from './sagas/rootSaga';
import createRootReducer from './reducers/rootReducer';

export interface ZundokoState {
  zundokos: string[];
}

export interface KiyoshiState {
  open: boolean;
}

export interface Store {
  zundoko: ZundokoState;
  kiyoshi: KiyoshiState;
}

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export default function configureStore(initialState: Partial<Store> = {}) {
  const middlewares = [];
  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }
  middlewares.push(routerMiddleware(history));
  middlewares.push(sagaMiddleware);

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(...middlewares),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
