import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInButton from './SignInButton';

describe('SignInButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <SignInButton onSignInButtonClick={() => {}} ml={1} disabled={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked if not disabled", () => {
    const handler = jest.fn();
    const renderResult = render(
      <SignInButton onSignInButtonClick={handler} ml={1} disabled={false} />,
    );

    const tree = renderResult.getByText('Sign In');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("calls the passed handler when it's clicked if disabled", () => {
    const handler = jest.fn();
    const renderResult = render(<SignInButton onSignInButtonClick={handler} ml={1} disabled />);

    const tree = renderResult.getByText('Sign In');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(0);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('has an attribute "ml" with its value set to the given number', () => {
    const renderResult = render(
      <SignInButton onSignInButtonClick={() => {}} ml={11} disabled={false} />,
    );

    const btn = renderResult.getByLabelText('sign in button');
    expect(btn).toHaveAttribute('ml', '11');
  });
});
