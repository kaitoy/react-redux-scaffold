import React from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import styled from 'styled-components';

/**
 * The type of props of LeftMarginedAppBar.
 */
export type LeftMarginedAppBarProps = Readonly<
  AppBarProps & {
    /** The left margin (in px) of the app bar. */
    marginLeft: number;
  }
>;

const LeftMarginedAppBar = styled(({ marginLeft, ...props }: LeftMarginedAppBarProps) => (
  // Remove LeftMarginedAppBarProps to suppress a runtime warning from react-dom.
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AppBar {...props} />
))`
  margin-left: ${({ marginLeft }: LeftMarginedAppBarProps) => marginLeft}px;
  width: calc(100% - ${({ marginLeft }: LeftMarginedAppBarProps) => marginLeft}px);
`;

export default LeftMarginedAppBar;
