import React, { FunctionComponent, useState, useCallback } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import AccountMenuButton from '~/views/atoms/buttons/AccountMenuButton';
import PopupMenuItem, { PopupMenuItemProps } from '~/views/molecules/PopupMenuItem';
import { User } from '~/state/ducks/user/models';

/**
 * The type of props of AccountMenu.
 */
type AccountMenuProps = Readonly<{
  /** The event handler called when the menu item 'Sign Out' is clicked. */
  onSignOutClick: NonNullable<PopupMenuItemProps['onClick']>;

  /** Current user. */
  currentUser: User;
}>;

const AccountMenu: FunctionComponent<AccountMenuProps> = ({ onSignOutClick, currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAccountMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleAccountMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOutClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setAnchorEl(null);
      onSignOutClick(event);
    },
    [onSignOutClick],
  );

  return (
    <>
      <AccountMenuButton onAccountMenuButtonClick={handleAccountMenuOpen} />
      <Menu
        aria-label="account menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleAccountMenuClose}
      >
        <Typography align="center" noWrap gutterBottom>
          {currentUser.name}
        </Typography>
        <Divider />
        <PopupMenuItem text="Sign Out" icon={<ExitToAppIcon />} onClick={handleSignOutClick} />
      </Menu>
    </>
  );
};

export default React.memo(AccountMenu);
