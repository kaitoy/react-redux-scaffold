import { ZUNDOKO_FETCH_SUCCEEDED, KIYOSHIED } from '../actions/actionTypes';
import { Kiyoshied, ZundokoFetchSucceeded } from '../actions/actions';

export function zundokos(state: string[] = [], action: ZundokoFetchSucceeded): Array<string> {
  switch (action.type) {
    case ZUNDOKO_FETCH_SUCCEEDED:
      if (typeof action.payload === 'undefined') {
        return state;
      }
      return [...state, action.payload.zundoko === 'zun' ? 'ズン' : 'ドコ'];
    default:
      return state;
  }
}

export function kiyoshi(
  state: { open: boolean } = { open: false },
  action: Kiyoshied,
): { open: boolean } {
  switch (action.type) {
    case KIYOSHIED:
      return { open: true };
    default:
      return state;
  }
}
