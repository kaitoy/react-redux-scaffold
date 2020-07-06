import { getCurrentUser } from './selectors';
import { AppState } from './reducers';
// @ts-ignore  Cannot find module
import { userSamples } from '~/state/ducks/user/models';

describe('getCurrentUser', () => {
  test('returns currentUser in the store.', () => {
    {
      const state: { app: AppState } = {
        app: {
          currentUser: undefined,
        },
      };

      const user = getCurrentUser(state);
      expect(user).toBeUndefined();
    }

    {
      const state: { app: AppState } = {
        app: {
          currentUser: userSamples[1],
        },
      };

      const user = getCurrentUser(state);
      expect(user).toEqual(userSamples[1]);
    }
  });
});
