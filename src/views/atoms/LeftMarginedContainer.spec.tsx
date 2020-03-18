import React from 'react';
import { render } from '@testing-library/react';
import LeftMarginedContainer from './LeftMarginedContainer';

describe('LeftMarginedContainer', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <LeftMarginedContainer marginLeft={200}>
        <div />
      </LeftMarginedContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('has specified margin in its style attribute', () => {
    const renderResult = render(
      <LeftMarginedContainer marginLeft={123} data-testid="test">
        <div />
      </LeftMarginedContainer>,
    );

    const tree = renderResult.getByTestId('test');
    expect(tree).toHaveStyleRule('margin-left', '123px');
    expect(tree).toHaveStyleRule('width', 'calc(100% - 123px)');
  });
});
