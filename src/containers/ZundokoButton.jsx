// @flow

import { connect } from 'react-redux';
import ContainedButton from '../components/ContainedButton';
import { zundokoButtonClicked } from '../actions/actions';

const ZundokoButton = connect(
  () => ({
    text: 'ZUNDOKO',
  }),
  {
    onClick: zundokoButtonClicked,
  },
)(ContainedButton);

export default ZundokoButton;
