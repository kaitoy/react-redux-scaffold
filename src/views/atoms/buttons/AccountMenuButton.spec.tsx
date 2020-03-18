import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AccountMenuButton from './AccountMenuButton';

describe('AccountMenuButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<AccountMenuButton onAccountMenuButtonClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<AccountMenuButton onAccountMenuButtonClick={handler} />);

    const tree = renderResult.getByLabelText('account menu button');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
