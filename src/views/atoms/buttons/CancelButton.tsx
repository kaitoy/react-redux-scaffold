import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of CancelButton.
 */
export type CancelButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml'> & {
    /** The event handler called when the button is clicked */
    onCancelButtonClick: SpacingButtonProps['onClick'];
  }
>;

const CancelButton: FunctionComponent<CancelButtonProps> = ({ onCancelButtonClick, ml }) => (
  <SpacingButton
    variant="contained"
    aria-label="cancel button"
    onClick={onCancelButtonClick}
    ml={ml}
  >
    Cancel
  </SpacingButton>
);

export default CancelButton;
