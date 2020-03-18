import { createSelector } from 'reselect';
import { StoreState } from '~/state/ducks';
import { denormalizeZundokos, zundokoNormalizrSchemaKey } from './models';

/**
 * Returns whether zundokos data is ready.
 *
 * @param state - The state in Redux store.
 * @returns true if zundokos are already fetched, false otherwise.
 */
export const isZundokoDataReady = ({ zundoko }: StoreState) => zundoko.dataReady;

/**
 * Returns whether some entities are being posted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being posted; false otherwise.
 */
export const isZundokoDataBeingPosted = ({ zundoko }: StoreState) => zundoko.dataBeingPosted;

/**
 * Returns whether some entities are being deleted.
 *
 * @param storeState - The state in Redux store.
 * @returns True if some entities are being deleted; false otherwise.
 */
export const isZundokoDataBeingDeleted = ({ zundoko }: StoreState) => zundoko.dataBeingDeleted;

/**
 * Returns all zundokos in the store.
 *
 * @param state - The state in Redux store.
 * @returns a list of zundokos.
 */
export const getZundokos = createSelector(
  ({ zundoko }: StoreState) => zundoko.data,
  (data) =>
    denormalizeZundokos({
      result: data.ids,
      entities: { [zundokoNormalizrSchemaKey]: data.entities },
    }),
);

/**
 * Returns a zundoko having the the given ID.
 *
 * @param state - The state in Redux store.
 * @param id - An ID of zundoko.
 * @returns a zundoko, or undefined if zundoko having the ID is not found.
 */
export const getZundoko = createSelector(
  ({ zundoko }: StoreState) => zundoko.data,
  (_: StoreState, id: string) => id,
  (data, id) => data.entities[id],
);

/**
 * Returns gotToKiyoshi flag.
 *
 * @param state - The state in Redux store.
 * @returns gotToKiyoshi.
 */
export const isGotToKiyoshi = ({ zundoko }: StoreState) => zundoko.gotToKiyoshi;
