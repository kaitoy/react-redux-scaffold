import React, { FunctionComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  text: string;
  open: boolean;
}

const MyDialog: FunctionComponent<Props> = ({ text, open }) => (
  <Dialog open={open}>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <DialogTitle>{text}</DialogTitle>
  </Dialog>
);

export default MyDialog;
