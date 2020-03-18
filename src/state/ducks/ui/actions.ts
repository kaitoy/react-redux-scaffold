/**
 * Returns an action indicating the sidebar is being opened.
 *
 * @returns An action.
 */
export function sidebarOpened(): Readonly<{ type: 'ui/sidebarOpened' }> {
  return { type: 'ui/sidebarOpened' };
}

/**
 * Returns an action indicating the sidebar is being closed.
 *
 * @returns An action.
 */
export function sidebarClosed(): Readonly<{ type: 'ui/sidebarClosed' }> {
  return { type: 'ui/sidebarClosed' };
}

/**
 * Returns an action indicating the error dialog is being opened.
 *
 * @param contentText - Content text to show in the dialog.
 * @returns An action.
 */
export function errorDialogOpened(
  contentText: string,
): Readonly<{ type: 'ui/errorDialogOpened'; payload: { ui: { contentText: string } } }> {
  return { type: 'ui/errorDialogOpened', payload: { ui: { contentText } } };
}

/**
 * Returns an action indicating the error dialog is being closed.
 *
 * @returns An action.
 */
export function errorDialogClosed(): Readonly<{ type: 'ui/errorDialogClosed' }> {
  return { type: 'ui/errorDialogClosed' };
}
