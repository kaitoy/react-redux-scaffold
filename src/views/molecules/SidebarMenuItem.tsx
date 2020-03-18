import React, { ReactElement, FunctionComponent } from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText';

/**
 * The type of props of SidebarMenuItem.
 */
export type SidebarMenuItemProps = Readonly<{
  /** The text on the menu item. */
  text: ListItemTextProps['primary'];

  /** The menu item icon. */
  icon: ReactElement;

  /** The event handler called when the list item is clicked. */
  onClick: ListItemProps<'div'>['onClick'];
}>;

const SidebarMenuItem: FunctionComponent<SidebarMenuItemProps> = ({ text, icon, onClick }) => (
  <ListItem button dense onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} primaryTypographyProps={{ variant: 'h6' }} />
  </ListItem>
);

export default SidebarMenuItem;
