import { connect } from 'react-redux';
import TextList from '../components/TextList';
import { Store } from '../configureStore';

const ZundokoList = connect(
  ({ zundokos }: Store) => ({
    textList: zundokos,
  }),
  {},
)(TextList);

export default ZundokoList;
