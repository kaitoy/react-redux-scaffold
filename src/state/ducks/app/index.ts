import { User } from '~/state/ducks/user/models';

export { appReducer } from './reducers';

/**
 * The type of application state in the Redux store.
 */
export type AppState = Readonly<{
  /** The current user. */
  currentUser?: User;
}>;
