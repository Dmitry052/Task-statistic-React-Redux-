import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Sort } from './../index';

configure({ adapter: new Adapter() });

describe('<Sort />', () => {
  const contentTable = [
    {
      bill_id: 78,
      bill_date: '2018-05-11T02:03:14.000Z',
      tokens_sold: '1856',
      coins: 'LTC',
      email: 'thayne@thayne.net',
      kyc_statuses: null,
      tokens_sold: '1856'
    },

    {
      bill_id: 1,
      bill_date: '2018-04-16T11:07:27.000Z',
      tokens_sold: '971',
      coins: 'COUPON',
      email: 'billhegarty@postmaster.co.uk',
      kyc_statuses: 'NEW',
      tokens_sold: '971'
    }
  ];
  const handleSetState = (item, value) => {};
  const wrapper = shallow(
    <Sort
      contentTable={contentTable}
      handleSetState={handleSetState}
      path={'bill_date'}
      type={'date'}
      field={'bill_date'}
    />
  );

  it('Render sort icon (desc and asc)', () => {
    expect(wrapper.find('.fa-sort-amount-desc').length).toBe(1);
    expect(wrapper.find('.fa-sort-amount-asc').length).toBe(0);
    wrapper.setState({ status: false });
    expect(wrapper.find('.fa-sort-amount-desc').length).toBe(0);
    expect(wrapper.find('.fa-sort-amount-asc').length).toBe(1);
  });

  it('HandleStatus', () => {
    expect(wrapper.state('status')).toBe(false);
    wrapper.instance().handleStatus();
    expect(wrapper.state('status')).toBe(true);
  });

  it('Handle sortUp function', () => {
    const resultSortFuncDown = wrapper.instance().handleStatus();
    expect(resultSortFuncDown[0].bill_id).toBe(78);
    const resultSortFuncUp = wrapper.instance().handleStatus();
    expect(resultSortFuncUp[0].bill_id).toBe(1);
  });

  it('Matches the snapshot Sort component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
