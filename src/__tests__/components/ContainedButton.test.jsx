import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContainedButton from '../../components/ContainedButton';

describe('components', () => {
  describe('ContainedButton', () => {
    test('renders correctly', () => {
      const { asFragment } = render(<ContainedButton text="ZUNDOKO" onClick={() => {}} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test("calls the passed handler when it's clicked", () => {
      const handler = jest.fn();
      const { getByText } = render(<ContainedButton text="ZUNDOKO" onClick={handler} />);
      fireEvent.click(getByText('ZUNDOKO'));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
