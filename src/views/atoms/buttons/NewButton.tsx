import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of NewButton.
 */
export type NewButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml' | 'disabled'> & {
    /** The event handler called when the button is clicked */
    onNewButtonClick: SpacingButtonProps['onClick'];
  }
>;

const NewButton: FunctionComponent<NewButtonProps> = ({ onNewButtonClick, ml, disabled }) => (
  <SpacingButton
    variant="contained"
    aria-label="new button"
    onClick={onNewButtonClick}
    ml={ml}
    disabled={disabled}
  >
    New
  </SpacingButton>
);

export default NewButton;
