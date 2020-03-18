import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CloseButton from './CloseButton';

describe('CloseButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<CloseButton onCloseButtonClick={() => {}} ml={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<CloseButton onCloseButtonClick={handler} ml={1} />);

    const tree = renderResult.getByText('Close');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('has an attribute "ml" with its value set to the given number', () => {
    const renderResult = render(<CloseButton onCloseButtonClick={() => {}} ml={11} />);

    const btn = renderResult.getByLabelText('close button');
    expect(btn).toHaveAttribute('ml', '11');
  });
});
