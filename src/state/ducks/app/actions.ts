import { User } from '~/state/ducks/user/models';

/**
 * Returns an action indicating the current user is signed out.
 *
 * @returns An action.
 */
export function signedOut(): Readonly<{ type: 'app/signedOut' }> {
  return { type: 'app/signedOut' };
}

/**
 * Returns an action indicating a user is signed in.
 *
 * @param user - A user signing in.
 * @returns an action.
 */
export const signedIn = (
  user: User,
): Readonly<{ type: 'app/signedIn'; payload: { app: { user: User } } }> => ({
  type: 'app/signedIn',
  payload: {
    app: {
      user,
    },
  },
});
