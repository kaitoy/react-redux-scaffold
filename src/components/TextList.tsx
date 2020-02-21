import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  textList: string[];
}

const TextList: FunctionComponent<Props> = ({ textList }) => {
  const items = textList.map(txt => (
    <ListItem>
      <ListItemText primary={txt} />
    </ListItem>
  ));
  // eslint-disable-next-line react/jsx-one-expression-per-line
  return <List component="nav">{items}</List>;
};

export default TextList;
