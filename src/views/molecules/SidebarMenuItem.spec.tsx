import React from 'react';
import { render } from '@testing-library/react';
import SidebarMenuItem from './SidebarMenuItem';

describe('SidebarMenuItem', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<SidebarMenuItem text="test" icon={<></>} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("contains a node set to 'icon'", () => {
    const renderResult = render(<SidebarMenuItem text="test" icon={<span>HOGE</span>} />);

    const iconNode = renderResult.getByText('HOGE');
    expect(iconNode).not.toBeNull();
    expect(renderResult.container).toContainElement(iconNode);
  });
});
