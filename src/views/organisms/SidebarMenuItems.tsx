import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PeopleIcon from '@material-ui/icons/People';
import StarsIcon from '@material-ui/icons/Stars';
import SidebarMenuItem, { SidebarMenuItemProps } from '~/views/molecules/SidebarMenuItem';

/**
 * The type of props of SidebarMenuItems.
 */
export type SidebarMenuItemsProps = Readonly<{
  /** The event handler called when the Play Zundoko link is clicked */
  onClickPlayZundoko: NonNullable<SidebarMenuItemProps['onClick']>;

  /** The event handler called when the Users link is clicked */
  onClickUsers: NonNullable<SidebarMenuItemProps['onClick']>;

  /** The event handler called when the Kiyoshies link is clicked */
  onClickKiyoshies: NonNullable<SidebarMenuItemProps['onClick']>;
}>;

const SidebarMenuItems: FunctionComponent<SidebarMenuItemsProps> = ({
  onClickPlayZundoko,
  onClickUsers,
  onClickKiyoshies,
}) => (
  <>
    <List>
      <SidebarMenuItem text="Play Zundoko" icon={<MusicNoteIcon />} onClick={onClickPlayZundoko} />
    </List>
    <List>
      <SidebarMenuItem text="Users" icon={<PeopleIcon />} onClick={onClickUsers} />
    </List>
    <List>
      <SidebarMenuItem text="Kiyoshies" icon={<StarsIcon />} onClick={onClickKiyoshies} />
    </List>
  </>
);

export default React.memo(SidebarMenuItems);
