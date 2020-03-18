import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopupMenuItem from './PopupMenuItem';

describe('PopupMenuItem', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<PopupMenuItem text="test" icon={<></>} onClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls the passed handler when it's clicked", () => {
    const handler = jest.fn();
    const renderResult = render(<PopupMenuItem text="test" icon={<></>} onClick={handler} />);

    const tree = renderResult.getByText('test');
    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent.click(tree);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("contains a node set to 'icon'", () => {
    const renderResult = render(
      <PopupMenuItem text="test" icon={<span>HOGE</span>} onClick={() => {}} />,
    );

    const iconNode = renderResult.getByText('HOGE');
    expect(iconNode).not.toBeNull();
    expect(renderResult.container).toContainElement(iconNode);
  });
});
