import { createSelector } from 'reselect';
import { StoreState } from '~/state/ducks';
import { denormalizeKiyoshies, kiyoshiNormalizrSchemaKey } from './models';
import { userNormalizrSchemaKey } from '~/state/ducks/user/models';

/**
 * Returns whether kiyoshies data is ready.
 *
 * @param state - The state in Redux store.
 * @returns true if kiyoshies are already fetched, false otherwise.
 */
export const isKiyoshiDataReady = ({ kiyoshi }: StoreState) => kiyoshi.dataReady;

/**
 * Returns whether some entities are being posted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being posted; false otherwise.
 */
export const isKiyoshiDataBeingPosted = ({ kiyoshi }: StoreState) => kiyoshi.dataBeingPosted;

/**
 * Returns whether some entities are being deleted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being deleted; false otherwise.
 */
export const isKiyoshiDataBeingDeleted = ({ kiyoshi }: StoreState) => kiyoshi.dataBeingDeleted;

/**
 * Returns all kiyoshies in the store.
 *
 * @param state - The state in Redux store.
 * @returns a list of kiyoshies.
 */
export const getKiyoshies = createSelector(
  ({ kiyoshi }: StoreState) => kiyoshi.data,
  ({ user }: StoreState) => user.data,
  (kiyoshiData, userData) =>
    denormalizeKiyoshies({
      result: kiyoshiData.ids,
      entities: {
        [kiyoshiNormalizrSchemaKey]: kiyoshiData.entities,
        [userNormalizrSchemaKey]: userData.entities,
      },
    }),
);

/**
 * Returns a kiyoshi having the the given ID.
 *
 * @param state - The state in Redux store.
 * @param id - An ID of kiyoshi.
 * @returns a kiyoshi, or undefined if kiyoshi having the ID is not found.
 */
export const getKiyoshi = createSelector(
  ({ kiyoshi }: StoreState) => kiyoshi.data,
  ({ user }: StoreState) => user.data,
  (_: StoreState, id: string) => id,
  (kiyoshiData, userData, id) =>
    denormalizeKiyoshies({
      result: [id],
      entities: {
        [kiyoshiNormalizrSchemaKey]: kiyoshiData.entities,
        [userNormalizrSchemaKey]: userData.entities,
      },
    }).pop(),
);
