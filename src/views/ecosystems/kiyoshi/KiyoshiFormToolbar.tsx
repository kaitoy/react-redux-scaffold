import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormMethods } from 'react-hook-form';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { kiyoshiesBeingDeleted } from '~/state/ducks/kiyoshi/actions';
import { isKiyoshiDataBeingDeleted } from '~/state/ducks/kiyoshi/selectors';
import { KiyoshiFormData } from '~/views/organisms/kiyoshi/KiyoshiFormContents';
import ConfirmationDialog from '~/views/organisms/ConfirmationDialog';

/**
 * The type of props of KiyoshiFormToolbar.
 */
type KiyoshiFormToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: UseFormMethods<KiyoshiFormData>['handleSubmit'];

    /** A callback called when the entity the form shows is deleted. */
    handleDeletionCompleted: () => void;
  }
>;

const KiyoshiFormToolbar: FunctionComponent<KiyoshiFormToolbarProps> = ({
  handleSubmit,
  buttonsDisabled,
  handleDeletionCompleted,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentText, setDialogContentText] = useState('');
  const [deletionStarted, setDeletionStarted] = useState(false);
  const deleting = useSelector(isKiyoshiDataBeingDeleted);
  const dispatch = useDispatch();
  const handleDeleteButtonClick = useCallback(
    handleSubmit(({ id }) => {
      setDialogContentText(`Are you sure to delete the Kiyoshi ${id}?`);
      setDialogOpen(true);
    }),
    [handleSubmit],
  );
  const handleOkButtonClick = useCallback(
    handleSubmit(({ id }) => {
      setDeletionStarted(true);
      setDialogOpen(false);
      dispatch(kiyoshiesBeingDeleted([id]));
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
        title="Kiyoshi"
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

export default React.memo(KiyoshiFormToolbar);
