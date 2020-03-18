export { uiReducer } from './reducers';

/**
 * The type of UI state in the Redux store.
 */
export type UIState = Readonly<{
  /** True if the sidebar is open; false otherwise. */
  sidebarOpen: boolean;

  /** True if the error dialog is open; false otherwise. */
  errorDialogOpen: boolean;

  /** The content text of the error dialog. */
  errorDialogContentText: string;
}>;
