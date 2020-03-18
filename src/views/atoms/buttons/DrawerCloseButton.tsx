import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styled from 'styled-components';

const RightAligner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

/**
 * The type of props of DrawerCloseButton.
 */
export type DrawerCloseButtonProps = Readonly<{
  /** The event handler called when the close button is clicked */
  onDrawerCloseButtonClick: IconButtonProps['onClick'];
}>;

const DrawerCloseButton: FunctionComponent<DrawerCloseButtonProps> = ({
  onDrawerCloseButtonClick,
}) => (
  <RightAligner>
    <IconButton onClick={onDrawerCloseButtonClick} aria-label="drawer close button">
      <ChevronLeftIcon />
    </IconButton>
  </RightAligner>
);

export default DrawerCloseButton;
