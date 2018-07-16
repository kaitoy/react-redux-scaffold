// @flow

import React from 'react';
import type { Node } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Zundoko from './Zundoko';

const App = (): Node => (
  <div styleName="App">
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/zundoko" component={Zundoko} />
  </div>
);

export default App;
