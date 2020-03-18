import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InfoButton from './InfoButton';

describe('InfoButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<InfoButton onInfoButtonClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<InfoButton onInfoButtonClick={handler} />);

    const tree = renderResult.getByLabelText('info button');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
