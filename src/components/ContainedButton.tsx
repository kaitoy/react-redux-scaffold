import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import { zundokoButtonClicked } from '../actions/actions';

type Props = {
  text: string;
  onClick: typeof zundokoButtonClicked;
};

const ContainedButton: FunctionComponent<Props> = ({ text, onClick }) => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);

export default ContainedButton;
