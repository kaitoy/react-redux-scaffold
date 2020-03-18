import { Zundoko, NormalizedZundokos } from './models';
import * as watcherSagas from './watcherSagas';

export const zundokoWatcherSagas = Object.values(watcherSagas);

export { zundokoReducer } from './reducers';

/**
 * The type of Zundoko state in the Redux store.
 */
export type ZundokoState = Readonly<{
  /** True if data already fetched, false otherwise. */
  dataReady: boolean;

  /** True if some entities are being deleted; false otherwise. */
  dataBeingDeleted: boolean;

  /** True if some entities are being posted; false otherwise. */
  dataBeingPosted: boolean;

  /** Fetched data. */
  data: {
    ids: Zundoko['id'][];
    entities: NormalizedZundokos;
  };

  /** Set to true if the zundokos pattern meets the Kiyoshi condition. */
  gotToKiyoshi: boolean;
}>;
