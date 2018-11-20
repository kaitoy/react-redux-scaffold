import { connect } from 'react-redux';
import MyDialog from '../components/MyDialog';
import { Store } from '../configureStore';

const KiyoshiDialog = connect(
  ({ kiyoshi }: Store) => ({
    text: 'キ・ヨ・シ！',
    open: kiyoshi.open,
  }),
  {},
)(MyDialog);

export default KiyoshiDialog;
