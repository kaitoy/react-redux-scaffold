import { StoreState } from '~/state/ducks';

/**
 * Returns whether the sidebar is open.
 *
 * @param storeState - The state in Redux store.
 * @returns True if the sidebar is open in the state; false otherwise.
 */
export const isSidebarOpen = ({ ui }: StoreState) => ui.sidebarOpen;

/**
 * Returns whether the error dialog is open.
 *
 * @param storeState - The state in Redux store.
 * @returns True if the error dialog is open in the state; false otherwise.
 */
export const isErrorDialogOpen = ({ ui }: StoreState) => ui.errorDialogOpen;

/**
 * Returns a content text of the error dialog.
 *
 * @param storeState - The state in Redux store.
 * @returns a text.
 */
export const getErrorDialogContentText = ({ ui }: StoreState) => ui.errorDialogContentText;
