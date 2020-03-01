import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import { ZundokoState, KiyoshiState } from '../configureStore';
import { kiyoshied, zundokoFetchSucceeded } from '../actions/actions';

export const zundoko = produce(
  (draft: Draft<ZundokoState>, action: ReturnType<typeof zundokoFetchSucceeded>) => {
    switch (action.type) {
      case 'ZUNDOKO_FETCH_SUCCEEDED':
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

export const kiyoshi: Reducer<KiyoshiState, ReturnType<typeof kiyoshied>> = (
  state = { open: false },
  action,
) => {
  switch (action.type) {
    case 'KIYOSHIED':
      return { open: true };
    default:
      return state;
  }
};
