import React, { FunctionComponent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormMethods } from 'react-hook-form';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { zundokoBeingAdded, zundokosBeingDeleted } from '~/state/ducks/zundoko/actions';
import { isZundokoDataBeingDeleted } from '~/state/ducks/zundoko/selectors';
import { DataTableFormData } from '~/views/organisms/DataTable';
import ConfirmationDialog from '~/views/organisms/ConfirmationDialog';

/**
 * The type of props of ZundokoListToolbar.
 */
type ZundokoListToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: UseFormMethods<DataTableFormData>['handleSubmit'];
  }
>;

const ZundokoListToolbar: FunctionComponent<ZundokoListToolbarProps> = ({
  handleSubmit,
  buttonsDisabled,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentText, setDialogContentText] = useState('');
  const deleting = useSelector(isZundokoDataBeingDeleted);
  const dispatch = useDispatch();
  const handleNewButtonClick = useCallback(() => {
    dispatch(zundokoBeingAdded());
  }, [dispatch]);
  const handleDeleteButtonClick = useCallback(
    handleSubmit(({ selectedRows }) => {
      if (selectedRows) {
        setDialogContentText(
          `Are you sure to delete the following Zundokos?: ${selectedRows.split(',').join(', ')}`,
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
        dispatch(zundokosBeingDeleted(selectedRows.split(',')));
      }
    }),
    [handleSubmit],
  );
  const handleCancelButtonClick = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <MainToolbar
        title="Zundokos"
        onNewButtonClick={handleNewButtonClick}
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

export default ZundokoListToolbar;
