import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ZDKSidebar from './ZDKSidebar';
// @ts-ignore  Cannot find module
import { sidebarClosed } from '~/state/ducks/ui/actions';
// @ts-ignore  Cannot find module
import * as uiSelectors from '~/state/ducks/ui/selectors';

describe('ZDKSidebar', () => {
  test("shows the drawer only when it's open", () => {
    const store = createStore(() => {});

    {
      uiSelectors.isSidebarOpen = jest.fn(() => true);
      const renderResult = render(
        <Provider store={store}>
          <ZDKSidebar drawerWidth={123} />
        </Provider>,
      );

      // Somehow isSidebarOpen is called twice.
      expect(uiSelectors.isSidebarOpen).toHaveBeenCalledTimes(2);

      const drawer = renderResult.getByLabelText('drawer');
      drawer.childNodes.forEach((node) => expect(node).toBeVisible());
      expect(drawer).toHaveStyleRule('width', '123px');
    }

    cleanup();

    {
      uiSelectors.isSidebarOpen = jest.fn(() => false);
      const renderResult = render(
        <Provider store={store}>
          <ZDKSidebar drawerWidth={123} />
        </Provider>,
      );

      // Somehow isSidebarOpen is called twice.
      expect(uiSelectors.isSidebarOpen).toHaveBeenCalledTimes(2);

      const drawer = renderResult.getByLabelText('drawer');
      drawer.childNodes.forEach((node) => expect(node).not.toBeVisible());
      expect(drawer).toHaveStyleRule('width', '123px');
    }
  });

  test('dispatches sidebarClosed when the drawer close button is clicked', () => {
    const reducer = jest.fn();
    const store = createStore(reducer);
    reducer.mockClear();
    uiSelectors.isSidebarOpen = jest.fn(() => true);
    const renderResult = render(
      <Provider store={store}>
        <ZDKSidebar drawerWidth={200} />
      </Provider>,
    );

    const drawerCloseButton = renderResult.getByLabelText('drawer close button');
    fireEvent.click(drawerCloseButton);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledWith(undefined, sidebarClosed());
  });
});
