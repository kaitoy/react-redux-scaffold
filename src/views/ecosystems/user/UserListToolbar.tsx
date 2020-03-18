import React, { FunctionComponent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContextValues } from 'react-hook-form';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { usersBeingDeleted } from '~/state/ducks/user/actions';
import { isUserDataBeingDeleted } from '~/state/ducks/user/selectors';
import { DataTableFormData } from '~/views/organisms/DataTable';
import ConfirmationDialog from '~/views/organisms/ConfirmationDialog';

/**
 * The type of props of UserListToolbar.
 */
type UserListToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: FormContextValues<DataTableFormData>['handleSubmit'];

    /**
     * A method to open a blank form to create a new user.
     */
    openBlankForm: () => void;
  }
>;

const UserListToolbar: FunctionComponent<UserListToolbarProps> = ({
  handleSubmit,
  openBlankForm,
  buttonsDisabled,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentText, setDialogContentText] = useState('');
  const deleting = useSelector(isUserDataBeingDeleted);
  const dispatch = useDispatch();
  const handleDeleteButtonClick = useCallback(
    handleSubmit(({ selectedRows }) => {
      if (selectedRows) {
        setDialogContentText(
          `Are you sure to delete the following Users?: ${selectedRows.split(',').join(', ')}`,
        );
        setDialogOpen(true);
      }
    }),
    [handleSubmit],
  );
  const handleOkButtonClick = useCallback(
    handleSubmit(({ selectedRows }) => {
      setDialogOpen(false);
      if (selectedRows) {
        dispatch(usersBeingDeleted(selectedRows.split(',')));
      }
    }),
    [handleSubmit],
  );
  const handleCancelButtonClick = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <MainToolbar
        title="Users"
        onNewButtonClick={openBlankForm}
        onDeleteButtonClick={handleDeleteButtonClick}
        buttonsDisabled={buttonsDisabled || deleting}
      />
      <ConfirmationDialog
        contentText={dialogContentText}
        open={dialogOpen}
        onOkButtonClick={handleOkButtonClick}
        onCancelButtonClick={handleCancelButtonClick}
      />
    </>
  );
};

export default UserListToolbar;
