import React from 'react';
import { render, wait, fireEvent, screen } from '@testing-library/react';
import AccountMenu from './AccountMenu';

describe('AccountMenu', () => {
  test('renders the menu button as expected', () => {
    const { asFragment } = render(
      <AccountMenu onSignOutClick={() => {}} currentUser={{ name: 'hoge' }} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the menu as expected', () => {
    render(<AccountMenu onSignOutClick={() => {}} currentUser={{ name: 'hoge' }} />);
    expect(screen.getByLabelText('account menu')).toMatchSnapshot();
  });

  test("shows the popup menu only after it's clicked", () => {
    const renderResult = render(
      <AccountMenu onSignOutClick={() => {}} currentUser={{ name: 'hoge' }} />,
    );

    const accountMenu = screen.getByLabelText('account menu');
    expect(accountMenu).not.toBeVisible();

    const accountMenuButton = renderResult.getByLabelText('account menu button');
    fireEvent.click(accountMenuButton);
    expect(accountMenu).toBeVisible();
  });

  test('closes the popup menu when a menu item is clicked', async () => {
    const renderResult = render(
      <AccountMenu onSignOutClick={() => {}} currentUser={{ name: 'hoge' }} />,
    );

    const accountMenuButton = renderResult.getByLabelText('account menu button');
    fireEvent.click(accountMenuButton);

    const accountMenu = screen.getByLabelText('account menu');
    expect(accountMenu).toBeVisible();

    const signOut = screen.getByText('Sign Out');
    fireEvent.click(signOut);
    await wait(() => expect(accountMenu).not.toBeVisible());
  });

  test('closes the popup menu when outside of the menu clicked', async () => {
    const renderResult = render(
      <AccountMenu onSignOutClick={() => {}} currentUser={{ name: 'hoge' }} />,
    );

    const accountMenuButton = renderResult.getByLabelText('account menu button');
    fireEvent.click(accountMenuButton);

    const accountMenu = screen.getByLabelText('account menu');
    expect(accountMenu).toBeVisible();

    // accountMenu and its first child covers whole screen
    // to trap click and key down events.
    fireEvent.click(accountMenu.firstChild);
    await wait(() => expect(accountMenu).not.toBeVisible());
  });

  test("calls the passed handler when 'Sign Out' clicked", () => {
    const handler = jest.fn();
    const renderResult = render(
      <AccountMenu onSignOutClick={handler} currentUser={{ name: 'hoge' }} />,
    );

    const accountMenuButton = renderResult.getByLabelText('account menu button');
    fireEvent.click(accountMenuButton);
    expect(handler).toHaveBeenCalledTimes(0);

    const signOut = screen.getByText('Sign Out');
    fireEvent.click(signOut);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
