import React from 'react';
import { render } from '@testing-library/react';
import FormContainer from './FormContainer';

describe('FormContainer', () => {
  test('is rendered as expected', () => {
    const { asFragment } = render(
      <FormContainer>
        <div />
      </FormContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
