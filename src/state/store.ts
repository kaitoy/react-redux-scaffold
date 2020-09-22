import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { enableES5 } from 'immer';
import { reducers, rootSaga } from './ducks';

enableES5();

const rootReducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [];
  middlewares.push(sagaMiddleware);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
