import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OkButton from './OkButton';

describe('OkButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<OkButton onOkButtonClick={() => {}} ml={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<OkButton onOkButtonClick={handler} ml={1} />);

    const tree = renderResult.getByText('OK');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('has an attribute "ml" with its value set to the given number', () => {
    const renderResult = render(<OkButton onOkButtonClick={() => {}} ml={11} />);

    const btn = renderResult.getByLabelText('ok button');
    expect(btn).toHaveAttribute('ml', '11');
  });
});
