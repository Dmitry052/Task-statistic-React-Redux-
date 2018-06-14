import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Loader } from './../index';

configure({ adapter: new Adapter() });

describe('<Loader />', () => {
  const tree = shallow(
    <Loader styleBlock={'some-test-class'} />
  );

  it('should contain 1 div elements', () => {
    expect(tree.find('div').length).toBe(1);
  });

  it('should contain 1 i elements', () => {
    expect(tree.find('div').children().length).toBe(1);
  });

  it('Matches the snapshot HeaderTable component', () => {
    expect(toJson(tree)).toMatchSnapshot();
    tree.unmount();
  });
});
