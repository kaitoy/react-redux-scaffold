import React, { FunctionComponent, useCallback } from 'react';
import { Switch, Route, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ZDKHeader from '~/views/ecosystems/ZDKHeader';
import ZDKSidebar from '~/views/ecosystems/ZDKSidebar';
import ZDKMainContainer from '~/views/ecosystems/ZDKMainContainer';
import ZundokoListView from '~/views/natures/zundoko/ZundokoListView';
import ZundokoFormView from '~/views/natures/zundoko/ZundokoFormView';
import UserListView from '~/views/natures/user/UserListView';
import UserFormView from '~/views/natures/user/UserFormView';
import KiyoshiListView from '~/views/natures/kiyoshi/KiyoshiListView';
import KiyoshiFormView from '~/views/natures/kiyoshi/KiyoshiFormView';
import ZDKErrorDialog from '~/views/ecosystems/ZDKErrorDialog';
import { getCurrentUser } from '~/state/ducks/app/selectors';

const sidebarWidth = 180;

const Home: FunctionComponent = () => {
  const currentUser = useSelector(getCurrentUser);
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const handleClickPlayZundoko = useCallback(() => history.push(`${path}/zundokos`), [
    history,
    path,
  ]);
  const handleClickUsers = useCallback(() => history.push(`${path}/users`), [history, path]);
  const handleClickKiyoshies = useCallback(() => history.push(`${path}/kiyoshies`), [
    history,
    path,
  ]);

  if (!currentUser) {
    return <Redirect to={`${path}/signIn?cb=${pathname}`} />;
  }

  return (
    <>
      <ZDKSidebar
        drawerWidth={sidebarWidth}
        onClickPlayZundoko={handleClickPlayZundoko}
        onClickUsers={handleClickUsers}
        onClickKiyoshies={handleClickKiyoshies}
      />

      <ZDKHeader marginLeft={sidebarWidth} />

      <main>
        <ZDKMainContainer marginLeft={sidebarWidth}>
          <Switch>
            <Route exact sensitive path={`${path}`}>
              <Redirect to={`${path}/zundokos`} />
            </Route>

            <Route exact sensitive path={`${path}/zundokos`}>
              <ZundokoListView />
            </Route>
            <Route exact strict sensitive path={`${path}/zundokos/:id`}>
              <ZundokoFormView listViewURL={`${path}/zundokos`} />
            </Route>

            <Route exact sensitive path={`${path}/users`}>
              <UserListView newFormPath="_new" />
            </Route>
            <Route exact strict sensitive path={`${path}/users/_new`}>
              <UserFormView listViewURL={`${path}/users`} />
            </Route>
            <Route exact strict sensitive path={`${path}/users/:id`}>
              <UserFormView listViewURL={`${path}/users`} />
            </Route>

            <Route exact sensitive path={`${path}/kiyoshies`}>
              <KiyoshiListView />
            </Route>
            <Route exact strict sensitive path={`${path}/kiyoshies/:id`}>
              <KiyoshiFormView listViewURL={`${path}/kiyoshies`} />
            </Route>
          </Switch>
        </ZDKMainContainer>
      </main>

      <ZDKErrorDialog />
    </>
  );
};

export default Home;
