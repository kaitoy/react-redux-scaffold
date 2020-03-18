import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CancelButton from './CancelButton';

describe('CancelButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<CancelButton onCancelButtonClick={() => {}} ml={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<CancelButton onCancelButtonClick={handler} ml={1} />);

    const tree = renderResult.getByText('Cancel');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('has an attribute "ml" with its value set to the given number', () => {
    const renderResult = render(<CancelButton onCancelButtonClick={() => {}} ml={11} />);

    const btn = renderResult.getByLabelText('cancel button');
    expect(btn).toHaveAttribute('ml', '11');
  });
});
