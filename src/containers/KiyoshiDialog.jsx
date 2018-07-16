// @flow

import { connect } from 'react-redux';
import MyDialog from '../components/MyDialog';

const KiyoshiDialog = connect(
  ({ kiyoshi }) => ({
    text: 'キ・ヨ・シ！',
    open: kiyoshi.open,
  }),
  {},
)(MyDialog);

export default KiyoshiDialog;
