import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of OkButton.
 */
export type OkButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml'> & {
    /** The event handler called when the button is clicked */
    onOkButtonClick: SpacingButtonProps['onClick'];
  }
>;

const OkButton: FunctionComponent<OkButtonProps> = ({ onOkButtonClick, ml }) => (
  <SpacingButton
    variant="contained"
    aria-label="ok button"
    color="primary"
    onClick={onOkButtonClick}
    ml={ml}
  >
    OK
  </SpacingButton>
);

export default OkButton;
