import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContainedButton from '../../components/ContainedButton';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('components', () => {
  describe('ContainedButton', () => {
    test('renders correctly', () => {
      const tree = renderer.create(<ContainedButton text="ZUNDOKO" onClick={() => {}} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("calls the passed handler when it's clicked", () => {
      const handler = jest.fn();
      const wrapper = mount(<ContainedButton text="ZUNDOKO" onClick={handler} />);
      wrapper.find('button').simulate('click');
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
