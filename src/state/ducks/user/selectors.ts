import { createSelector } from 'reselect';
import { StoreState } from '~/state/ducks';
import { denormalizeUsers, userNormalizrSchemaKey } from './models';

/**
 * Returns whether users data is ready.
 *
 * @param state - The state in Redux store.
 * @returns true if users are already fetched, false otherwise.
 */
export const isUserDataReady = ({ user }: StoreState) => user.dataReady;

/**
 * Returns whether some entities are being posted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being posted; false otherwise.
 */
export const isUserDataBeingPosted = ({ user }: StoreState) => user.dataBeingPosted;

/**
 * Returns whether some entities are being deleted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being deleted; false otherwise.
 */
export const isUserDataBeingDeleted = ({ user }: StoreState) => user.dataBeingDeleted;

/**
 * Returns all users in the store.
 *
 * @param state - The state in Redux store.
 * @returns a list of users.
 */
export const getUsers = createSelector(
  ({ user }: StoreState) => user.data,
  (data) =>
    denormalizeUsers({
      result: data.ids,
      entities: { [userNormalizrSchemaKey]: data.entities },
    }),
);

/**
 * Returns a user having the the given ID.
 *
 * @param state - The state in Redux store.
 * @param id - An ID of user.
 * @returns a user, or undefined if user having the ID is not found.
 */
export const getUser = createSelector(
  ({ user }: StoreState) => user.data,
  (_: StoreState, id: string) => id,
  (users, id) => users.entities[id],
);
