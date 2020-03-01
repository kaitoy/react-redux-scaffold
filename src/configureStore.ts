import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

export type ZundokoState = {
  zundokos: string[];
};

export type KiyoshiState = {
  open: boolean;
};

export type StoreState = {
  zundoko: ZundokoState;
  kiyoshi: KiyoshiState;
};

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [];
  middlewares.push(sagaMiddleware);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
