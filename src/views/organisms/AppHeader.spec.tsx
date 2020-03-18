import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from '@testing-library/react';
import AppHeader from './AppHeader';

// We will use this empty store to wrap the testing component (that includes connected components)
// with Redux Provider to avoid an error at render().
const store = createStore(() => {});

jest.mock('~/state/ducks/app/selectors', () => ({
  getCurrentUser: () => ({ name: 'hoge' }),
}));

describe('AppHeader', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <AppHeader
          title="Test"
          onHamburgerMenuButtonClick={() => {}}
          showMenuButton
          marginLeft={100}
        />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows the menu button only when showMenuButton is set to true', () => {
    {
      const renderResult = render(
        <Provider store={store}>
          <AppHeader
            title="Test"
            onHamburgerMenuButtonClick={() => {}}
            showMenuButton
            marginLeft={100}
          />
        </Provider>,
      );

      const menuButton = renderResult.queryByLabelText('hamburger menu');
      expect(menuButton).not.toBeNull();
    }

    cleanup();

    {
      const renderResult = render(
        <Provider store={store}>
          <AppHeader
            title="Test"
            onHamburgerMenuButtonClick={() => {}}
            showMenuButton={false}
            marginLeft={100}
          />
        </Provider>,
      );

      const menuButton = renderResult.queryByLabelText('hamburger menu');
      expect(menuButton).toBeNull();
    }
  });

  test('calls the passed handler when the menu button clicked', () => {
    const handler = jest.fn();
    const renderResult = render(
      <Provider store={store}>
        <AppHeader
          title="Test"
          onHamburgerMenuButtonClick={handler}
          showMenuButton
          marginLeft={100}
        />
      </Provider>,
    );

    const menuButton = renderResult.queryByLabelText('hamburger menu');
    fireEvent.click(menuButton);
    expect(handler).toHaveBeenCalledTimes(1);
    fireEvent.click(menuButton);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
