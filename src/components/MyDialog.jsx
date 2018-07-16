// @flow

import React from 'react';
import type { Node } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

type Props = {
  text: string,
  open: boolean,
};

const MyDialog = ({ text, open }: Props): Node => (
  <Dialog open={open}>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
    <DialogTitle>{text}</DialogTitle>
  </Dialog>
);

MyDialog.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MyDialog;
