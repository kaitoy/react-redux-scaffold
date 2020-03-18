import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from '~/views/natures/Home';
import SignInFormView from '~/views/natures/SignInFormView';

const AppRoutes: FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route exact strict sensitive path="/ui/signIn">
        <SignInFormView />
      </Route>
      <Redirect exact strict from="/" to="/ui" />
      <Route sensitive path="/ui">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
