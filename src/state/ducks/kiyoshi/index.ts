import { Kiyoshi, NormalizedKiyoshies } from './models';
import * as watcherSagas from './watcherSagas';

export const kiyoshiWatcherSagas = Object.values(watcherSagas);

export { kiyoshiReducer } from './reducers';

/**
 * The type of Kiyoshi state in the Redux store.
 */
export type KiyoshiState = Readonly<{
  /** True if data already fetched, false otherwise. */
  dataReady: boolean;

  /** True if some entities are being deleted; false otherwise. */
  dataBeingDeleted: boolean;

  /** True if some entities are being posted; false otherwise. */
  dataBeingPosted: boolean;

  /** Fetched data. */
  data: {
    ids: Kiyoshi['id'][];
    entities: NormalizedKiyoshies;
  };
}>;
