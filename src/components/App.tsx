import React, { FunctionComponent, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Zundoko from './Zundoko';

const Fonts = React.lazy(() => import(/* webpackPrefetch: true */ '../fonts'));

const Wrapper = styled.div`
  margin: 1rem;
  font-family: Roboto, Arial, Helvetica, sans-serif;
`;

const App: FunctionComponent = () => (
  <Wrapper>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/zundoko" component={Zundoko} />
    <Suspense fallback={<div />}>
      <Fonts />
    </Suspense>
  </Wrapper>
);

export default App;
