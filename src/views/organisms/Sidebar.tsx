import React, { FunctionComponent } from 'react';
import Divider from '@material-ui/core/Divider';
import FixedWidthDrawer, { FixedWidthDrawerProps } from '~/views/atoms/FixedWidthDrawer';
import DrawerCloseButton, { DrawerCloseButtonProps } from '~/views/atoms/buttons/DrawerCloseButton';

/**
 * The type of props of Sidebar.
 */
export type SidebarProps = Readonly<
  Pick<FixedWidthDrawerProps, 'drawerWidth'> &
    DrawerCloseButtonProps & {
      /** True if the sidebar is open; false otherwise. */
      open: NonNullable<FixedWidthDrawerProps['open']>;

      /** Menu items in this sidebar. */
      children: React.ReactNode;
    }
>;

const Sidebar: FunctionComponent<SidebarProps> = ({
  open,
  onDrawerCloseButtonClick,
  drawerWidth,
  children,
}) => (
  <FixedWidthDrawer variant="persistent" anchor="left" open={open} drawerWidth={drawerWidth}>
    <DrawerCloseButton onDrawerCloseButtonClick={onDrawerCloseButtonClick} />
    <Divider />
    {children}
  </FixedWidthDrawer>
);

export default React.memo(Sidebar);
