import React, { ReactElement } from 'react';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

/**
 * The type of props of PopupMenuItem.
 */
export type PopupMenuItemProps = Readonly<{
  /** The text on the menu item. */
  text: string;

  /** The menu item icon. */
  icon: ReactElement;

  /** The event handler called when the menu item is clicked. */
  onClick: MenuItemProps['onClick'];
}>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const PopupMenuItem = React.forwardRef<HTMLLIElement, PopupMenuItemProps>(
  ({ text, icon, onClick }, ref) => (
    <MenuItem onClick={onClick} ref={ref}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant="inherit">{text}</Typography>
    </MenuItem>
  ),
);

export default PopupMenuItem;
