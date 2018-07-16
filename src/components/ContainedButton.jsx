// @flow

import React from 'react';
import type { Node } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import type { ActionCreator } from '../actions/actions';

type Props = {
  text: string,
  onClick: ActionCreator,
};

const ContainedButton = ({ text, onClick }: Props): Node => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);

ContainedButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContainedButton;
