import produce, { Draft } from 'immer';
import { signedOut, signedIn } from './actions';
import { AppState } from './index';

const initialState: AppState = {
  currentUser: undefined,
};

/**
 * The Redux reducer for the app state.
 *
 * @param state - The current app state.
 * @param action - An action on the state.
 */
// eslint-disable-next-line import/prefer-default-export
export const appReducer = produce(
  (draft: Draft<AppState>, action: ReturnType<typeof signedOut> | ReturnType<typeof signedIn>) => {
    switch (action.type) {
      case 'app/signedOut':
        // eslint-disable-next-line no-param-reassign
        draft.currentUser = undefined;
        break;
      case 'app/signedIn':
        // eslint-disable-next-line no-param-reassign
        draft.currentUser = action.payload.app.user;
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action; // ensure that a case clause exists for every expected action.
        Object.isFrozen(_); // pretend to use _ to make tsc happier.
    }
  },
  initialState,
);
