import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountMenu from '~/views/organisms/AccountMenu';
import { signedOut } from '~/state/ducks/app/actions';
import { getCurrentUser } from '~/state/ducks/app/selectors';

const ZDKAccountMenu: FunctionComponent = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const handleSignOutClick = useCallback(() => dispatch(signedOut()), [dispatch]);

  if (!currentUser) {
    return <></>;
  }
  return <AccountMenu onSignOutClick={handleSignOutClick} currentUser={currentUser} />;
};

export default ZDKAccountMenu;
