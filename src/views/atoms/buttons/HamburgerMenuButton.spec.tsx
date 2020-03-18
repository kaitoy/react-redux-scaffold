import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HamburgerMenuButton from './HamburgerMenuButton';

describe('HamburgerMenuButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<HamburgerMenuButton onHamburgerMenuButtonClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<HamburgerMenuButton onHamburgerMenuButtonClick={handler} />);

    const tree = renderResult.getByLabelText('hamburger menu');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
