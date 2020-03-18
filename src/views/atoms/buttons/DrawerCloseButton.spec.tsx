import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DrawerCloseButton from './DrawerCloseButton';

describe('DrawerCloseButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<DrawerCloseButton onDrawerCloseButtonClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<DrawerCloseButton onDrawerCloseButtonClick={handler} />);

    const tree = renderResult.getByLabelText('drawer close button');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
