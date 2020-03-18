import React from 'react';
import { render } from '@testing-library/react';
import SpacingButton from './SpacingButton';

describe('SpacingButton', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <SpacingButton ml={1} pb={2}>
        Test
      </SpacingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
