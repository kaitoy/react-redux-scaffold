import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of CloseButton.
 */
export type CloseButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml'> & {
    /** The event handler called when the button is clicked */
    onCloseButtonClick: SpacingButtonProps['onClick'];
  }
>;

const CloseButton: FunctionComponent<CloseButtonProps> = ({ onCloseButtonClick, ml }) => (
  <SpacingButton
    variant="contained"
    aria-label="close button"
    color="primary"
    onClick={onCloseButtonClick}
    ml={ml}
  >
    Close
  </SpacingButton>
);

export default CloseButton;
