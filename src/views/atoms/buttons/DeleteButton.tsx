import React, { FunctionComponent } from 'react';
import SpacingButton, { SpacingButtonProps } from '~/views/atoms/buttons/SpacingButton';

/**
 * The type of props of DeleteButton.
 */
export type DeleteButtonProps = Readonly<
  Pick<SpacingButtonProps, 'ml' | 'disabled'> & {
    /** The event handler called when the button is clicked */
    onDeleteButtonClick: SpacingButtonProps['onClick'];
  }
>;

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
  onDeleteButtonClick,
  ml,
  disabled,
}) => (
  <SpacingButton
    variant="contained"
    aria-label="delete button"
    onClick={onDeleteButtonClick}
    ml={ml}
    disabled={disabled}
  >
    Delete
  </SpacingButton>
);

export default DeleteButton;
