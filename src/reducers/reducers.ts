import { Reducer } from 'redux';
import { ZundokoState, KiyoshiState } from '../configureStore';
import { ZUNDOKO_FETCH_SUCCEEDED, KIYOSHIED } from '../actions/actionTypes';
import { Kiyoshied, ZundokoFetchSucceeded } from '../actions/actions';

export const zundoko: Reducer<ZundokoState, ZundokoFetchSucceeded> = (
  state = { zundokos: [] },
  action,
) => {
  switch (action.type) {
    case ZUNDOKO_FETCH_SUCCEEDED:
      if (typeof action.payload === 'undefined') {
        return state;
      }
      return { zundokos: [...state.zundokos, action.payload.zundoko === 'zun' ? 'ズン' : 'ドコ'] };
    default:
      return state;
  }
};

export const kiyoshi: Reducer<KiyoshiState, Kiyoshied> = (state = { open: false }, action) => {
  switch (action.type) {
    case KIYOSHIED:
      return { open: true };
    default:
      return state;
  }
};
