import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/**
 * The type of props of HamburgerMenuButton.
 */
export type HamburgerMenuButtonProps = Readonly<{
  /** The event handler called when the menu button is clicked */
  onHamburgerMenuButtonClick: IconButtonProps['onClick'];
}>;

const HamburgerMenuButton: FunctionComponent<HamburgerMenuButtonProps> = ({
  onHamburgerMenuButtonClick,
}) => (
  <IconButton edge="start" onClick={onHamburgerMenuButtonClick} aria-label="hamburger menu">
    <MenuIcon />
  </IconButton>
);

export default HamburgerMenuButton;
