import React from 'react';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import styled from 'styled-components';

/**
 * The type of props of FixedWidthDrawer.
 */
export type FixedWidthDrawerProps = Readonly<
  DrawerProps & {
    /** The width (in px) of the drawer. */
    drawerWidth: number;
  }
>;

const FixedWidthDrawer = styled(({ drawerWidth, ...props }: FixedWidthDrawerProps) => (
  // Remove FixedWidthDrawerProps to suppress a runtime warning from react-dom.
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Drawer aria-label="drawer" {...props} PaperProps={{ style: { width: `${drawerWidth}px` } }} />
))`
  width: ${({ drawerWidth }: FixedWidthDrawerProps) => drawerWidth}px;
`;

export default FixedWidthDrawer;
