import React from 'react';
import { render } from '@testing-library/react';
import FixedWidthDrawer from './FixedWidthDrawer';

describe('FixedWidthDrawer', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<FixedWidthDrawer drawerWidth={200} open variant="persistent" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('has specified width in its style', () => {
    const renderResult = render(<FixedWidthDrawer drawerWidth={123} open variant="persistent" />);

    const tree = renderResult.getByLabelText('drawer');
    expect(tree).toHaveStyle('width: 123px');
  });
});
