import React from 'react';
import { render } from '@testing-library/react';
import ToolbarTitle from './ToolbarTitle';

describe('ToolbarTitle', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<ToolbarTitle />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('has "flex-grow: 1" in its style attribute', () => {
    const renderResult = render(<ToolbarTitle data-testid="test" />);

    const tree = renderResult.getByTestId('test');
    expect(tree).toHaveStyleRule('flex-grow', '1');
  });
});
