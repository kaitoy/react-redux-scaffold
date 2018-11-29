import { connect } from 'react-redux';
import TextList from '../components/TextList';
import { Store } from '../configureStore';

const ZundokoList = connect(
  ({ zundoko }: Store) => ({
    textList: zundoko.zundokos.toArray(),
  }),
  {},
)(TextList);

export default ZundokoList;
