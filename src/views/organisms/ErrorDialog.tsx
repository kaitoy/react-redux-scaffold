import React, { FunctionComponent } from 'react';
import CloseButton, { CloseButtonProps } from '~/views/atoms/buttons/CloseButton';
import BaseDialog, { BaseDialogProps } from '~/views/organisms/BaseDialog';

/**
 * The type of props of ErrorDialog.
 */
type ErrorDialogProps = Readonly<
  Pick<CloseButtonProps, 'onCloseButtonClick'> & Pick<BaseDialogProps, 'contentText' | 'open'>
>;

const ErrorDialog: FunctionComponent<ErrorDialogProps> = ({
  contentText,
  onCloseButtonClick,
  open,
}) => (
  <BaseDialog
    title="Error"
    contentText={contentText}
    buttons={[<CloseButton key="close" onCloseButtonClick={onCloseButtonClick} />]}
    open={open}
    onClose={onCloseButtonClick}
    ariaAttrPrefix="error"
  />
);

export default React.memo(ErrorDialog);
