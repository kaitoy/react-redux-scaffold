import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OkButton from '~/views/atoms/buttons/OkButton';
import BaseDialog from '~/views/organisms/BaseDialog';
import { isGotToKiyoshi } from '~/state/ducks/zundoko/selectors';
import { getCurrentUser } from '~/state/ducks/app/selectors';
import { kiyoshiBeingAdded } from '~/state/ducks/kiyoshi/actions';

const KiyoshiDialog: FunctionComponent = () => {
  const dispatch = useDispatch();
  const gotToKiyoshi = useSelector(isGotToKiyoshi);
  const currentUser = useSelector(getCurrentUser);
  const [dialogOpen, setDialogOpen] = useState(gotToKiyoshi);
  useEffect(() => {
    if (gotToKiyoshi && currentUser) {
      setDialogOpen(true);
      dispatch(kiyoshiBeingAdded(currentUser));
    }
  }, [gotToKiyoshi, setDialogOpen, currentUser, dispatch]);
  const onOkButtonClick = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <BaseDialog
      title="Say!"
      contentText="Ki Yo Shi!!"
      buttons={[<OkButton key="ok" onOkButtonClick={onOkButtonClick} />]}
      open={dialogOpen}
      onClose={onOkButtonClick}
      ariaAttrPrefix="kiyoshi"
    />
  );
};

export default React.memo(KiyoshiDialog);
