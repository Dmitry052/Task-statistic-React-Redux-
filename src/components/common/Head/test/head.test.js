import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Head } from './../index';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  const wrapper = shallow(<Head />);
  it('should contain 1 nav element', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });

  it('should contain 1 div element', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });

  it('should contain 2 a(link) elements', () => {
    expect(wrapper.find('a').length).toBe(2);
  });

  it('should contain node logout', () => {
    expect(wrapper.find('#logout').exists()).toBe(true);
  });

  it('Matches the snapshot Head component', () => {
    const tree = shallow(<Head />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
