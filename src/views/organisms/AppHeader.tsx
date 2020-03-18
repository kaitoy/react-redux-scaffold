import React, { FunctionComponent } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import LeftMarginedAppBar, { LeftMarginedAppBarProps } from '~/views/atoms/LeftMarginedAppBar';
import HamburgerMenuButton, {
  HamburgerMenuButtonProps,
} from '~/views/atoms/buttons/HamburgerMenuButton';
import ZDKAccountMenu from '~/views/ecosystems/ZDKAccountMenu';
import ToolbarTitle from '~/views/atoms/ToolbarTitle';

/**
 * The type of props of AppHeader.
 */
export type AppHeaderProps = Readonly<
  HamburgerMenuButtonProps &
    Pick<LeftMarginedAppBarProps, 'marginLeft'> & {
      /** The title on the header. */
      title: string;

      /** Set true to show the menu button. */
      showMenuButton: boolean;
    }
>;

const AppHeader: FunctionComponent<AppHeaderProps> = ({
  title,
  onHamburgerMenuButtonClick,
  showMenuButton,
  marginLeft,
}) => (
  <LeftMarginedAppBar position="static" marginLeft={marginLeft} aria-label="app bar">
    <Toolbar>
      {showMenuButton ? (
        <HamburgerMenuButton onHamburgerMenuButtonClick={onHamburgerMenuButtonClick} />
      ) : (
        <></>
      )}
      <ToolbarTitle variant="h5">{title}</ToolbarTitle>
      <ZDKAccountMenu />
    </Toolbar>
  </LeftMarginedAppBar>
);

export default React.memo(AppHeader);
