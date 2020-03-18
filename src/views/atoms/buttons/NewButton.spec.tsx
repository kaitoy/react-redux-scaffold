import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewButton from './NewButton';

describe('NewButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <NewButton onNewButtonClick={() => {}} ml={1} disabled={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked if not disabled", () => {
    const handler = jest.fn();
    const renderResult = render(<NewButton onNewButtonClick={handler} ml={1} disabled={false} />);

    const tree = renderResult.getByText('New');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("calls the passed handler when it's clicked if disabled", () => {
    const handler = jest.fn();
    const renderResult = render(<NewButton onNewButtonClick={handler} ml={1} disabled />);

    const tree = renderResult.getByText('New');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(0);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('has an attribute "ml" with its value set to the given number', () => {
    const renderResult = render(<NewButton onNewButtonClick={() => {}} ml={11} disabled={false} />);

    const btn = renderResult.getByLabelText('new button');
    expect(btn).toHaveAttribute('ml', '11');
  });
});
