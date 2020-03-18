import React from 'react';
import { render } from '@testing-library/react';
import LeftMarginedAppBar from './LeftMarginedAppBar';

describe('LeftMarginedAppBar', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<LeftMarginedAppBar marginLeft={200} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('has specified margin in its style attribute', () => {
    const renderResult = render(<LeftMarginedAppBar marginLeft={123} data-testid="test" />);

    const tree = renderResult.getByTestId('test');
    expect(tree).toHaveStyleRule('margin-left', '123px');
    expect(tree).toHaveStyleRule('width', 'calc(100% - 123px)');
  });
});
