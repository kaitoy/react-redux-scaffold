import { kiyoshi } from '../../reducers/reducers';
import { zundokoFetchFailed, kiyoshied } from '../../actions/actions';

const initialState = {
  open: false,
};

describe('reducers', () => {
  describe('kiyoshi()', () => {
    test('returns the passsed state as it is when the action is not KIYOSHIED', () => {
      const state = kiyoshi(initialState, zundokoFetchFailed({}));
      expect(state).toEqual(initialState);
    });

    test('returns a state with open:true when the action is KIYOSHIED', () => {
      const state = kiyoshi(initialState, kiyoshied());
      expect(state.open).toBe(true);
    });
  });
});
