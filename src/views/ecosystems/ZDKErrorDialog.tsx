import React, { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorDialog from '~/views/organisms/ErrorDialog';
import { errorDialogClosed } from '~/state/ducks/ui/actions';
import { isErrorDialogOpen, getErrorDialogContentText } from '~/state/ducks/ui/selectors';

const ZDKErrorDialog: FunctionComponent = () => {
  const dispatch = useDispatch();
  const open = useSelector(isErrorDialogOpen);
  const contentText = useSelector(getErrorDialogContentText);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(errorDialogClosed());
  }, [dispatch]);

  return (
    <ErrorDialog
      contentText={contentText}
      onCloseButtonClick={handleCloseButtonClick}
      open={open}
    />
  );
};

export default React.memo(ZDKErrorDialog);
