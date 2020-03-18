import { User, NormalizedUsers } from './models';
import * as watcherSagas from './watcherSagas';

export const userWatcherSagas = Object.values(watcherSagas);

export { userReducer } from './reducers';

/**
 * The type of User state in the Redux store.
 */
export type UserState = Readonly<{
  /** True if data is already fetched, false otherwise. */
  dataReady: boolean;

  /** True if some entities are being deleted; false otherwise. */
  dataBeingDeleted: boolean;

  /** True if some entities are being posted; false otherwise. */
  dataBeingPosted: boolean;

  /** Fetched data. */
  data: {
    ids: User['id'][];
    entities: NormalizedUsers;
  };
}>;
