import React from 'react';
import { render } from '@testing-library/react';
import SidebarMenuItems from './SidebarMenuItems';

describe('SidebarMenuItems', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<SidebarMenuItems />);
    expect(asFragment()).toMatchSnapshot();
  });
});
