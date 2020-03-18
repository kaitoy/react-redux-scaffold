import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';
import theme from '~/views/theme';

const StyledAvatar = styled(Avatar)`
  background-color: ${theme.palette.primary.light};
`;

/**
 * The type of props of AccountMenuButton.
 */
export type AccountMenuButtonProps = Readonly<{
  /** The event handler called when the menu button is clicked */
  onAccountMenuButtonClick: IconButtonProps['onClick'];
}>;

const AccountMenuButton: FunctionComponent<AccountMenuButtonProps> = ({
  onAccountMenuButtonClick,
}) => (
  <IconButton
    edge="end"
    onClick={onAccountMenuButtonClick}
    size="small"
    aria-label="account menu button"
  >
    <StyledAvatar>
      <AccountCircle color="action" />
    </StyledAvatar>
  </IconButton>
);

export default AccountMenuButton;
