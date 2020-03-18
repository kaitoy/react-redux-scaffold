import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordField from './PasswordField';

describe('PasswordField', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(<PasswordField name="test" label="Test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('readOnly ver is rendered as expected', () => {
    const { asFragment } = render(<PasswordField name="test" label="Test" readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('has password attributes', () => {
    const renderResult = render(<PasswordField name="test" label="Test" />);
    const tree = renderResult.getByLabelText('input-test');

    expect(tree).toHaveAttribute('type', 'password');
    expect(tree).toHaveAttribute('autocomplete', 'current-password');
  });

  test('can be typed in if readOnly is false', async () => {
    const renderResult = render(<PasswordField name="test" label="Test" />);

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
    await userEvent.type(tree, 'test test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('test test');
  });

  test('can not be typed in if readOnly is true', async () => {
    const renderResult = render(<PasswordField name="test" label="Test" readOnly />);

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
    await userEvent.type(tree, 'test test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
  });

  test("doesn't has a helper text to show 'Read-only' if readOnly is false", () => {
    const renderResult = render(<PasswordField name="test" label="Test" />);

    const tree = renderResult.queryByText('Read-only');
    expect(tree).toBeNull();
  });

  test('has a helper text to show "Read-only" if readOnly is true', () => {
    const renderResult = render(<PasswordField name="test" label="Test" readOnly />);

    const tree = renderResult.queryByText('Read-only');
    expect(tree).not.toBeNull();
  });
});
