// @flow

import React from 'react';
import type { Node } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

type Props = {
  textList: Array<string>,
};

const TextList = ({ textList }: Props): Node => {
  const items = textList.map(txt => (
    <ListItem key={uuidv1()}>
      <ListItemText primary={txt} />
    </ListItem>
  ));
  // eslint-disable-next-line react/jsx-one-expression-per-line
  return <List component="nav">{items}</List>;
};

TextList.propTypes = {
  textList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TextList;
