import { StoreState } from '~/state/ducks';

/**
 * Returns the current user.
 *
 * @param storeState - The state in Redux store.
 * @returns the current user.
 */
// eslint-disable-next-line import/prefer-default-export
export const getCurrentUser = ({ app }: StoreState) => app.currentUser;
