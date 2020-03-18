import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContextValues } from 'react-hook-form';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { usersBeingDeleted } from '~/state/ducks/user/actions';
import { isZundokoDataBeingDeleted } from '~/state/ducks/zundoko/selectors';
import { UserFormData } from '~/views/organisms/user/UserFormContents';
import ConfirmationDialog from '~/views/organisms/ConfirmationDialog';

/**
 * The type of props of UserFormToolbar.
 */
type UserFormToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: FormContextValues<UserFormData>['handleSubmit'];

    /** A callback called when the entity the form shows is deleted. */
    handleDeletionCompleted: () => void;
  }
>;

const UserFormToolbar: FunctionComponent<UserFormToolbarProps> = ({
  handleSubmit,
  buttonsDisabled,
  handleDeletionCompleted,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentText, setDialogContentText] = useState('');
  const [deletionStarted, setDeletionStarted] = useState(false);
  const deleting = useSelector(isZundokoDataBeingDeleted);
  const dispatch = useDispatch();
  const handleDeleteButtonClick = useCallback(
    handleSubmit(({ id }) => {
      setDialogContentText(`Are you sure to delete the User ${id}?`);
      setDialogOpen(true);
    }),
    [handleSubmit],
  );
  const handleOkButtonClick = useCallback(
    handleSubmit(({ id }) => {
      setDeletionStarted(true);
      setDialogOpen(false);
      dispatch(usersBeingDeleted([id]));
    }),
    [handleSubmit],
  );
  const handleCancelButtonClick = useCallback(() => setDialogOpen(false), []);
  useEffect(() => {
    if (deletionStarted && !deleting) {
      handleDeletionCompleted();
    }
  }, [deletionStarted, deleting, handleDeletionCompleted]);

  return (
    <>
      <MainToolbar
        title="User"
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

export default React.memo(UserFormToolbar);
