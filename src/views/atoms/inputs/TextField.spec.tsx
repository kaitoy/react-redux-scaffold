import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './TextField';

describe('TextField', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<TextField name="test" label="Test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('readOnly ver is rendered as expected', () => {
    const { asFragment } = render(<TextField name="test" label="Test" readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('can be typed in if readOnly is false', async () => {
    const renderResult = render(<TextField name="test" label="Test" />);

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
    await userEvent.type(tree, 'test test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('test test');
  });

  test('can not be typed in if readOnly is true', async () => {
    const renderResult = render(<TextField name="test" label="Test" readOnly />);

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
    await userEvent.type(tree, 'test test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
  });

  test("doesn't has a helper text to show 'Read-only' if readOnly is false", () => {
    const renderResult = render(<TextField name="test" label="Test" />);

    const tree = renderResult.queryByText('Read-only');
    expect(tree).toBeNull();
  });

  test('has a helper text to show "Read-only" if readOnly is true', () => {
    const renderResult = render(<TextField name="test" label="Test" readOnly />);

    const tree = renderResult.queryByText('Read-only');
    expect(tree).not.toBeNull();
  });
});
