import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" />
      </MuiPickersUtilsProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('readOnly ver is rendered as expected', () => {
    const { asFragment } = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" readOnly />
      </MuiPickersUtilsProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('has an empty value if defaultValue is omitted"', () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
  });

  test('has an empty value if defaultValue is empty"', () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" defaultValue="" />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
  });

  test('has the given default value in the format of "YYYY-MM-DD"', () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" defaultValue="1234-01-31" />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.getByLabelText('input-test');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('1234-01-31');
  });

  test('can be typed in if readOnly is false', async () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.getByLabelText('input-test');
    await userEvent.type(tree, '19831214');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('1983-12-14');
  });

  test('can not be typed in if readOnly is true', async () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" readOnly />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.getByLabelText('input-test');
    await userEvent.type(tree, '19831214');
    // @ts-ignore  Property 'value' does not exist on type 'HTMLElement'
    expect(tree.value).toBe('');
  });

  test("doesn't has a helper text to show 'Read-only' if readOnly is false", () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.queryByText('Read-only');
    expect(tree).toBeNull();
  });

  test('has a helper text to show "Read-only" if readOnly is true', () => {
    const renderResult = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker name="test" label="Test" readOnly />
      </MuiPickersUtilsProvider>,
    );

    const tree = renderResult.queryByText('Read-only');
    expect(tree).not.toBeNull();
  });
});
