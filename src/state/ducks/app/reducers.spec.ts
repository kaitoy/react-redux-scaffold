import { AppState, appReducer } from './reducers';
import { signedOut, signedIn } from './actions';
// @ts-ignore  Cannot find module
import { userSamples } from '~/state/ducks/user/models';

describe('appReducer', () => {
  test('returns the passed state as it is when the dispatched action is not app/*.', () => {
    const action: unknown = { type: 'test/signedOut' };

    {
      const initialState: AppState = {
        currentUser: undefined,
      };

      const state = appReducer(initialState, action as ReturnType<typeof signedOut>);
      expect(state).toEqual(initialState);
    }

    {
      const initialState: AppState = {
        currentUser: userSamples[0],
      };

      const state = appReducer(initialState, action as ReturnType<typeof signedOut>);
      expect(state).toEqual(initialState);
    }
  });

  test('returns a state with currentUser set to the passed user when a signedIn action is dispatched.', () => {
    {
      const initialState: AppState = {
        currentUser: undefined,
      };

      const state = appReducer(initialState, signedIn(userSamples[1]));
      expect(state.currentUser).toEqual(userSamples[1]);
    }

    {
      const initialState: AppState = {
        currentUser: userSamples[0],
      };

      const state = appReducer(initialState, signedIn(userSamples[1]));
      expect(state.currentUser).toEqual(userSamples[1]);
    }
  });

  test('returns a state with currentUser set to undefined when a signedOut action is dispatched.', () => {
    {
      const initialState: AppState = {
        currentUser: undefined,
      };

      const state = appReducer(initialState, signedOut());
      expect(state.currentUser).toBeUndefined();
    }

    {
      const initialState: AppState = {
        currentUser: userSamples[0],
      };

      const state = appReducer(initialState, signedOut());
      expect(state.currentUser).toBeUndefined();
    }
  });
});
