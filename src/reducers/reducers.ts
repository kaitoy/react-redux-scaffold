import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import { ZundokoState, KiyoshiState } from '../configureStore';
import { ZUNDOKO_FETCH_SUCCEEDED, KIYOSHIED } from '../actions/actionTypes';
import { Kiyoshied, ZundokoFetchSucceeded } from '../actions/actions';

export const zundoko = produce(
  (draft: Draft<ZundokoState>, action: ZundokoFetchSucceeded) => {
    switch (action.type) {
      case ZUNDOKO_FETCH_SUCCEEDED:
        if (typeof action.payload === 'undefined') {
          return;
        }
        draft.zundokos.push(action.payload.zundoko);
        break;
      default:
    }
  },
  {
    zundokos: [],
  },
);

export const kiyoshi: Reducer<KiyoshiState, Kiyoshied> = (state = { open: false }, action) => {
  switch (action.type) {
    case KIYOSHIED:
      return { open: true };
    default:
      return state;
  }
};
