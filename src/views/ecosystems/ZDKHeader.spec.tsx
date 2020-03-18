import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ZDKHeader from './ZDKHeader';
// @ts-ignore  Cannot find module
import { sidebarOpened } from '~/state/ducks/ui/actions';
// @ts-ignore  Cannot find module
import * as uiSelectors from '~/state/ducks/ui/selectors';

jest.mock('~/state/ducks/app/selectors', () => ({
  getCurrentUser: () => ({ name: 'hoge' }),
}));

describe('ZDKHeader', () => {
  test('shows the menu button only when the sidebar is closed', () => {
    const store = createStore(() => {});

    {
      uiSelectors.isSidebarOpen = jest.fn((state) => true);
      const renderResult = render(
        <Provider store={store}>
          <ZDKHeader marginLeft={123} />
        </Provider>,
      );

      // Somehow isSidebarOpen is called twice.
      expect(uiSelectors.isSidebarOpen).toHaveBeenCalledTimes(2);

      const menuButton = renderResult.queryByLabelText('hamburger menu');
      expect(menuButton).toBeNull();

      const header = renderResult.getByLabelText('app bar');
      expect(header).toHaveStyleRule('margin-left', '123px');
    }

    cleanup();

    {
      uiSelectors.isSidebarOpen = jest.fn(() => false);
      const renderResult = render(
        <Provider store={store}>
          <ZDKHeader marginLeft={123} data-testid="test" />
        </Provider>,
      );

      // Somehow isSidebarOpen is called twice.
      expect(uiSelectors.isSidebarOpen).toHaveBeenCalledTimes(2);

      const menuButton = renderResult.queryByLabelText('hamburger menu');
      expect(menuButton).not.toBeNull();

      const header = renderResult.getByLabelText('app bar');
      expect(header).toHaveStyleRule('margin-left', '0px');
    }
  });

  test('dispatches sidebarOpened when the menu button is clicked', () => {
    const reducer = jest.fn();
    const store = createStore(reducer);
    reducer.mockClear();
    uiSelectors.isSidebarOpen = jest.fn(() => false);
    const renderResult = render(
      <Provider store={store}>
        <ZDKHeader marginLeft={200} />
      </Provider>,
    );

    const menuButton = renderResult.queryByLabelText('hamburger menu');
    fireEvent.click(menuButton);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledWith(undefined, sidebarOpened());
  });
});
