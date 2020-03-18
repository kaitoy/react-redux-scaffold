import React, { FunctionComponent } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import ToolbarTitle from '~/views/atoms/ToolbarTitle';
import NewButton, { NewButtonProps } from '~/views/atoms/buttons/NewButton';
import SubmitButton, { SubmitButtonProps } from '~/views/atoms/buttons/SubmitButton';
import DeleteButton, { DeleteButtonProps } from '~/views/atoms/buttons/DeleteButton';

/**
 * The type of props of MainToolbar.
 */
export type MainToolbarProps = Readonly<
  Partial<NewButtonProps> &
    Partial<SubmitButtonProps> &
    Partial<DeleteButtonProps> & {
      /** The title on the toolbar. */
      title: string;

      /** True if all buttons on the toolbar are disabled, false if all are enabled. */
      buttonsDisabled: boolean;
    }
>;

const MainToolbar: FunctionComponent<MainToolbarProps> = ({
  title,
  onNewButtonClick,
  onSubmitButtonClick,
  onDeleteButtonClick,
  buttonsDisabled,
}) => (
  <Toolbar>
    <ToolbarTitle variant="h6">{title}</ToolbarTitle>
    {onNewButtonClick ? (
      <NewButton onNewButtonClick={onNewButtonClick} ml={1} disabled={buttonsDisabled} />
    ) : (
      <></>
    )}
    {onSubmitButtonClick ? (
      <SubmitButton onSubmitButtonClick={onSubmitButtonClick} ml={1} disabled={buttonsDisabled} />
    ) : (
      <></>
    )}
    {onDeleteButtonClick ? (
      <DeleteButton onDeleteButtonClick={onDeleteButtonClick} ml={1} disabled={buttonsDisabled} />
    ) : (
      <></>
    )}
  </Toolbar>
);

export default React.memo(MainToolbar);
