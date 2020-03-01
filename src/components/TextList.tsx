import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type Props = {
  textList: string[];
};

const TextList: FunctionComponent<Props> = ({ textList }) => {
  const items = textList.map(txt => (
    <ListItem>
      <ListItemText primary={txt} />
    </ListItem>
  ));
  return <List component="nav">{items}</List>;
};

export default TextList;
