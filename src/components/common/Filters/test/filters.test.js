import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-localstorage-mock';

import { Filters } from './../index';

configure({ adapter: new Adapter() });

describe('<Filters />', () => {
  const queryParams = {
    date: {
      testDate: '2017-01-01'
    },
    testString: 'test string'
  };
  const filters = [
    {
      name: 'testString',
      type: 'string',
      displayName: 'TEST-STRING'
    },
    {
      name: 'testDate',
      type: 'date',
      displayName: 'TEST-DATE'
    },
    {
      name: 'testSelectx',
      type: 'selectx',
      displayName: 'TEST-SELECTX'
    }
  ];

  it('render component with role "super', () => {
    const role = 'super';
    const tree = shallow(
      <Filters
        role={role}
        filters={filters}
        queryParams={queryParams}
        onChangeDate={() => {}}
        handleUpdateData={() => {}}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('render component with role "user', () => {
    const role = 'super';
    const tree = shallow(
      <Filters
        role={role}
        filters={filters}
        queryParams={queryParams}
        onChangeDate={() => {}}
        handleUpdateData={() => {}}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('render component without role', () => {
    localStorage.setItem('role', 'user');
    const tree = shallow(
      <Filters
        filters={filters}
        queryParams={queryParams}
        onChangeDate={() => {}}
        handleUpdateData={() => {}}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
