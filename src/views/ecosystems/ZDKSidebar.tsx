import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar, { SidebarProps } from '~/views/organisms/Sidebar';
import { sidebarClosed } from '~/state/ducks/ui/actions';
import { isSidebarOpen } from '~/state/ducks/ui/selectors';
import SidebarMenuItems, { SidebarMenuItemsProps } from '~/views/organisms/SidebarMenuItems';

/**
 * The type of props of ZDKSidebar.
 */
type ZDKSidebarProps = Readonly<Pick<SidebarProps, 'drawerWidth'> & SidebarMenuItemsProps>;

const ZDKSidebar: FunctionComponent<ZDKSidebarProps> = ({
  drawerWidth,
  onClickPlayZundoko,
  onClickUsers,
  onClickKiyoshies,
}) => {
  const open = useSelector(isSidebarOpen);
  const dispatch = useDispatch();
  const handleSidebarCloseButtonClick = useCallback(() => dispatch(sidebarClosed()), [dispatch]);

  return (
    <Sidebar
      open={open}
      onDrawerCloseButtonClick={handleSidebarCloseButtonClick}
      drawerWidth={drawerWidth}
    >
      <SidebarMenuItems
        onClickPlayZundoko={onClickPlayZundoko}
        onClickUsers={onClickUsers}
        onClickKiyoshies={onClickKiyoshies}
      />
    </Sidebar>
  );
};

export default React.memo(ZDKSidebar);
