import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import Home from './Home';
// @ts-ignore  Cannot find module
import { reducers } from '~/state/ducks';

jest.mock('~/state/ducks/app/selectors', () => ({
  getCurrentUser: () => ({}),
}));

describe('Home', () => {
  test("doesn't show the menu button and show sidebar at the first rendering", () => {
    const store = createStore(combineReducers(reducers), {});
    const renderResult = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/ui/zundokos']} initialIndex={0}>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    const menuButton = renderResult.queryByLabelText('hamburger menu');
    expect(menuButton).toBeNull();

    const drawer = renderResult.getByLabelText('drawer');
    drawer.childNodes.forEach((node) => expect(node).toBeVisible());
    expect(drawer).toHaveStyleRule('width', '180px');

    const header = renderResult.getByLabelText('app bar');
    expect(header).toHaveStyleRule('margin-left', '180px');
  });

  test('closes the sidebar and shows the menu button when the drawer close button is clicked', () => {
    const store = createStore(combineReducers(reducers), {});
    const renderResult = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/ui/zundokos']} initialIndex={0}>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    const drawerCloseButton = renderResult.getByLabelText('drawer close button');
    fireEvent.click(drawerCloseButton);

    const drawer = renderResult.getByLabelText('drawer');
    wait(() => drawer.childNodes.forEach((node) => expect(node).not.toBeVisible()));
    expect(drawer).toHaveStyleRule('width', '180px');

    const header = renderResult.getByLabelText('app bar');
    expect(header).toHaveStyleRule('margin-left', '0px');

    const menuButton = renderResult.queryByLabelText('hamburger menu');
    wait(() => expect(menuButton).not.toBeNull());
  });
});
