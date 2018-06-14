import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { BodyTable } from './../index';
import {
  formatTime,
  countryFormat
} from './../../../main/owner/ContentTable/utils';
import pres from './../../../main/owner/ContentTable/localFormat';

configure({ adapter: new Adapter() });

describe('<BodyTable />', () => {
  const bodyTable = [
    { bill_date: 'date', text: '-', precision: null, nowrap: null },
    { coins: 'string', text: '-', precision: null, nowrap: null },
    { tokens_sold: 'number', text: '-', precision: null, nowrap: null },
    { country: 'country', text: '-', precision: null, nowrap: null },
    { some_field: 'not_key', text: '-', precision: null, nowrap: null },
    { some_field2: 'number', text: '-', precision: 1, nowrap: null },
    { some_field3: 'not_key', text: 'not key in itemTR', precision: 1, nowrap: null }
  ];
  const itemTR = {
    bill_id: 1,
    bill_date: '2018-04-16T11:07:27.000Z',
    tokens_sold: '971',
    coins: 'COUPON',
    email: 'billhegarty@postmaster.co.uk',
    kyc_statuses: 'NEW',
    country: 'ru',
    some_field: 'not switch case',
    some_field2: '23233,4444'
  };
  const index = 1;
  const tree = shallow(
    <BodyTable
      bodyTable={bodyTable}
      itemTR={itemTR}
      index={index}
      formatTime={formatTime}
      pres={pres}
      countryFormat={countryFormat}
    />
  );

  it('should contain 5 tr elements', () => {
    expect(tree.find('tr').children().length).toBe(6);
  });

  it('Matches the snapshot BodyTable component', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });
});
