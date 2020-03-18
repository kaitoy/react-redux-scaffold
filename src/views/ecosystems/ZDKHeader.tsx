import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader, { AppHeaderProps } from '~/views/organisms/AppHeader';
import { sidebarOpened } from '~/state/ducks/ui/actions';
import { isSidebarOpen } from '~/state/ducks/ui/selectors';

/**
 * The type of props of ZDKHeader.
 */
type ZDKHeaderProps = Readonly<Pick<AppHeaderProps, 'marginLeft'>>;

const ZDKHeader: FunctionComponent<ZDKHeaderProps> = ({ marginLeft }) => {
  const sidebarOpen = useSelector(isSidebarOpen);
  const actualMarginLeft = sidebarOpen ? marginLeft : 0;
  const dispatch = useDispatch();
  const handleHamburgerMenuButtonClick = useCallback(() => dispatch(sidebarOpened()), [dispatch]);

  return (
    <AppHeader
      title="Zundoko Kiyoshi"
      onHamburgerMenuButtonClick={handleHamburgerMenuButtonClick}
      showMenuButton={!sidebarOpen}
      marginLeft={actualMarginLeft}
    />
  );
};

export default React.memo(ZDKHeader);
