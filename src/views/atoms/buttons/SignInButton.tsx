import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of SignInButton.
 */
export type SignInButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml' | 'disabled'> & {
    /** The event handler called when the button is clicked */
    onSignInButtonClick: SpacingButtonProps['onClick'];
  }
>;

const SignInButton: FunctionComponent<SignInButtonProps> = ({
  onSignInButtonClick,
  ml,
  disabled,
}) => (
  <SpacingButton
    variant="contained"
    aria-label="sign in button"
    color="primary"
    onClick={onSignInButtonClick}
    ml={ml}
    disabled={disabled}
  >
    Sign In
  </SpacingButton>
);

export default SignInButton;
