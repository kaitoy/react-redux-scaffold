import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import ZDKAccountMenu from './ZDKAccountMenu';
// @ts-ignore  Cannot find module
import { signedOut } from '~/state/ducks/app/actions';

jest.mock('~/state/ducks/app/selectors', () => ({
  getCurrentUser: () => ({ name: 'hoge' }),
}));

describe('ZDKAccountMenu', () => {
  test("dispatches a signedOut action when 'Sign Out' clicked", () => {
    const reducer = jest.fn();
    const store = createStore(reducer);
    reducer.mockClear();
    const renderResult = render(
      <Provider store={store}>
        <ZDKAccountMenu />
      </Provider>,
    );

    const accountMenuButton = renderResult.getByLabelText('account menu button');
    fireEvent.click(accountMenuButton);
    const signOut = screen.getByText('Sign Out');
    fireEvent.click(signOut);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledWith(undefined, signedOut());
  });
});
