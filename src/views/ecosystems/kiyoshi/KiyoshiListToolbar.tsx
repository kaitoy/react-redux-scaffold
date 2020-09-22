import React, { FunctionComponent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormMethods } from 'react-hook-form/dist/index.ie11';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { kiyoshiesBeingDeleted } from '~/state/ducks/kiyoshi/actions';
import { isKiyoshiDataBeingDeleted } from '~/state/ducks/kiyoshi/selectors';
import { DataTableFormData } from '~/views/organisms/DataTable';
import ConfirmationDialog from '~/views/organisms/ConfirmationDialog';

/**
 * The type of props of KiyoshiListToolbar.
 */
type KiyoshiListToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: UseFormMethods<DataTableFormData>['handleSubmit'];
  }
>;

const KiyoshiListToolbar: FunctionComponent<KiyoshiListToolbarProps> = ({
  handleSubmit,
  buttonsDisabled,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentText, setDialogContentText] = useState('');
  const deleting = useSelector(isKiyoshiDataBeingDeleted);
  const dispatch = useDispatch();
  const handleDeleteButtonClick = useCallback(
    handleSubmit(({ selectedRows }) => {
      if (selectedRows) {
        setDialogContentText(
          `Are you sure to delete the following Kiyoshies?: ${selectedRows.split(',').join(', ')}`,
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
        dispatch(kiyoshiesBeingDeleted(selectedRows.split(',')));
      }
    }),
    [handleSubmit],
  );
  const handleCancelButtonClick = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <MainToolbar
        title="Kiyoshies"
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

export default KiyoshiListToolbar;
