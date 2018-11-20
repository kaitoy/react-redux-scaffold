import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

interface Props {
  textList: string[];
}

const TextList: FunctionComponent<Props> = ({ textList }) => {
  const items = textList.map(txt => (
    <ListItem key={uuidv1()}>
      <ListItemText primary={txt} />
    </ListItem>
  ));
  // eslint-disable-next-line react/jsx-one-expression-per-line
  return <List component="nav">{items}</List>;
};

TextList.propTypes = {
  textList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default TextList;
