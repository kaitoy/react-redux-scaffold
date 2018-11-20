import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ZundokoButton from '../containers/ZundokoButton';
import ZundokoList from '../containers/ZundokoList';
import KiyoshiDialog from '../containers/KiyoshiDialog';

const Zundoko: FunctionComponent = () => (
  <div>
    <AppBar position="static" color="default">
      <Toolbar>
        <ZundokoButton />
        <Typography variant="title" color="inherit">
          ZUNDOKO
        </Typography>
      </Toolbar>
    </AppBar>
    <ZundokoList />
    <KiyoshiDialog />
  </div>
);

export default Zundoko;
