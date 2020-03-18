import React, { FunctionComponent } from 'react';
import OkButton, { OkButtonProps } from '~/views/atoms/buttons/OkButton';
import CancelButton, { CancelButtonProps } from '~/views/atoms/buttons/CancelButton';
import BaseDialog, { BaseDialogProps } from '~/views/organisms/BaseDialog';

/**
 * The type of props of ConfirmationDialog.
 */
type ConfirmationDialogProps = Readonly<
  Pick<OkButtonProps, 'onOkButtonClick'> &
    Pick<CancelButtonProps, 'onCancelButtonClick'> &
    Pick<BaseDialogProps, 'contentText' | 'open'>
>;

const ConfirmationDialog: FunctionComponent<ConfirmationDialogProps> = ({
  contentText,
  onOkButtonClick,
  onCancelButtonClick,
  open,
}) => (
  <BaseDialog
    title="Confirmation"
    contentText={contentText}
    buttons={[
      <CancelButton key="cancel" onCancelButtonClick={onCancelButtonClick} />,
      <OkButton key="ok" onOkButtonClick={onOkButtonClick} />,
    ]}
    open={open}
    onClose={onCancelButtonClick}
    ariaAttrPrefix="error"
  />
);

export default React.memo(ConfirmationDialog);
