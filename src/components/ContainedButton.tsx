import React, { FunctionComponent } from 'react';
import { ActionCreator } from 'redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ZundokoButtonClicked } from '../actions/actions';

interface Props {
  text: string;
  onClick: ActionCreator<ZundokoButtonClicked>;
}

const ContainedButton: FunctionComponent<Props> = ({ text, onClick }) => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);

ContainedButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContainedButton;
