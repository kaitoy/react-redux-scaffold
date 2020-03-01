import React, { FunctionComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  text: string;
  open: boolean;
};

const MyDialog: FunctionComponent<Props> = ({ text, open }) => (
  <Dialog open={open}>
    <DialogTitle>{text}</DialogTitle>
  </Dialog>
);

export default MyDialog;
