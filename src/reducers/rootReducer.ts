import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import * as reducers from './reducers';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
export default createRootReducer;
