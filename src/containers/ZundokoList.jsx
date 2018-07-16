// @flow

import { connect } from 'react-redux';
import TextList from '../components/TextList';

const ZundokoList = connect(
  ({ zundokos }) => ({
    textList: zundokos,
  }),
  {},
)(TextList);

export default ZundokoList;
