import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of SubmitButton.
 */
export type SubmitButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml' | 'disabled'> & {
    /** The event handler called when the button is clicked */
    onSubmitButtonClick: SpacingButtonProps['onClick'];
  }
>;

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  onSubmitButtonClick,
  ml,
  disabled,
}) => (
  <SpacingButton
    variant="contained"
    aria-label="submit button"
    onClick={onSubmitButtonClick}
    ml={ml}
    disabled={disabled}
  >
    Submit
  </SpacingButton>
);

export default SubmitButton;
