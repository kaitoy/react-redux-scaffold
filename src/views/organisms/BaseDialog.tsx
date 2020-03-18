import React, { FunctionComponent } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const FatPaper = styled(Paper)`
  min-width: 15em;
`;

/**
 * The type of props of BaseDialog.
 */
export type BaseDialogProps = Readonly<
  Pick<DialogProps, 'open' | 'onClose'> & {
    /** The title of the dialog. */
    title: string;

    /** The content text. */
    contentText: string;

    /** Dialog action buttons. */
    buttons: React.ReactNode[];

    /** Prefix of aria-labelledby and aria-describedby. */
    ariaAttrPrefix: string;
  }
>;

const BaseDialog: FunctionComponent<BaseDialogProps> = ({
  title,
  contentText,
  buttons,
  open,
  onClose,
  ariaAttrPrefix,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby={`${ariaAttrPrefix}-dialog-title`}
    aria-describedby={`${ariaAttrPrefix}-dialog-description`}
    PaperComponent={FatPaper}
  >
    <DialogTitle id={`${ariaAttrPrefix}-dialog-title`}>{title}</DialogTitle>
    <DialogContent dividers>
      <DialogContentText id={`${ariaAttrPrefix}-dialog-description`}>
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>{buttons}</DialogActions>
  </Dialog>
);

export default React.memo(BaseDialog);
