import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  test('renders the menu button as expected', () => {
    const { asFragment } = render(
      <Sidebar open onDrawerCloseButtonClick={() => {}} drawerWidth={100} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows the drawer only when it's open", () => {
    {
      const renderResult = render(
        <Sidebar open onDrawerCloseButtonClick={() => {}} drawerWidth={100} />,
      );

      const drawer = renderResult.getByLabelText('drawer');
      drawer.childNodes.forEach((node) => expect(node).toBeVisible());
    }

    cleanup();

    {
      const renderResult = render(
        <Sidebar open={false} onDrawerCloseButtonClick={() => {}} drawerWidth={100} />,
      );

      const drawer = renderResult.getByLabelText('drawer');
      drawer.childNodes.forEach((node) => expect(node).not.toBeVisible());
    }
  });

  test('calls the passed handler when the drawer close button clicked', () => {
    const handler = jest.fn();
    const renderResult = render(
      <Sidebar open onDrawerCloseButtonClick={handler} drawerWidth={100} />,
    );

    const drawerCloseButton = renderResult.getByLabelText('drawer close button');
    fireEvent.click(drawerCloseButton);
    expect(handler).toHaveBeenCalledTimes(1);
    fireEvent.click(drawerCloseButton);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test("has specified drawerWidth in its drawer's style", () => {
    const handler = jest.fn();
    const renderResult = render(
      <Sidebar open onDrawerCloseButtonClick={handler} drawerWidth={123} />,
    );

    const tree = renderResult.getByLabelText('drawer');
    expect(tree).toHaveStyle('width: 123px');
  });
});
