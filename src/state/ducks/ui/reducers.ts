import produce, { Draft } from 'immer';
import { sidebarOpened, sidebarClosed, errorDialogOpened, errorDialogClosed } from './actions';
import { UIState } from './index';

const initialState: UIState = {
  sidebarOpen: true,
  errorDialogOpen: false,
  errorDialogContentText: '',
};

/**
 * The Redux reducer for the UI state.
 *
 * @param state - The current UI state.
 * @param action - An action on the state.
 * @returns a new state.
 */
// eslint-disable-next-line import/prefer-default-export
export const uiReducer = produce(
  (
    draft: Draft<UIState>,
    action:
      | ReturnType<typeof sidebarOpened>
      | ReturnType<typeof sidebarClosed>
      | ReturnType<typeof errorDialogOpened>
      | ReturnType<typeof errorDialogClosed>,
  ) => {
    switch (action.type) {
      case 'ui/sidebarOpened':
        // eslint-disable-next-line no-param-reassign
        draft.sidebarOpen = true;
        break;
      case 'ui/sidebarClosed':
        // eslint-disable-next-line no-param-reassign
        draft.sidebarOpen = false;
        break;
      case 'ui/errorDialogOpened':
        // eslint-disable-next-line no-param-reassign
        draft.errorDialogOpen = true;
        // eslint-disable-next-line no-param-reassign
        draft.errorDialogContentText = action.payload.ui.contentText;
        break;
      case 'ui/errorDialogClosed':
        // eslint-disable-next-line no-param-reassign
        draft.errorDialogOpen = false;
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action; // ensure that a case clause exists for every expected action.
        Object.isFrozen(_); // pretend to use _ to make tsc happier.
    }
  },
  initialState,
);
