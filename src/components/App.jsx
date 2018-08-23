// @flow

import React from 'react';
import type { Node } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Zundoko from './Zundoko';

const Wrapper = styled.div`
  margin: 1rem;
  font-family: Roboto, Arial, Helvetica, sans-serif;
`;

const App = (): Node => (
  <Wrapper>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/zundoko" component={Zundoko} />
  </Wrapper>
);

export default App;
