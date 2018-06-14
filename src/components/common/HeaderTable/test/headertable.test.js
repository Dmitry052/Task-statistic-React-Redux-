import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { HeaderTable } from './../index';

configure({ adapter: new Adapter() });

describe('<HeaderTable />', () => {
  const itemTR = [
    {
      field: 'bill_id',
      displayName: 'BILL_ID',
      prefix: null,
      postfix: null,
      nowrap: false,
      path: 'bill_id',
      sortable: false,
      total: { text: 'Total:' },
      type: 'number'
    },

    {
      field: 'bill_date',
      displayName: 'BILL_DATE',
      prefix: null,
      postfix: null,
      nowrap: false,
      path: 'bill_date',
      sortable: false,
      total: { text: '-' },
      type: 'date'
    },

    {
      field: 'tokens_sold',
      displayName: 'TOKENS_SOLD',
      prefix: null,
      postfix: null,
      nowrap: false,
      path: 'tokens_sold',
      sortable: true,
      total: { text: '-' },
      type: 'number'
    }
  ];
  const name = 'bills';
  const index = 0;

  const tree = shallow(
    <HeaderTable itemTR={itemTR} name={name} index={index} />
  );

  it('should contain 2 tr elements', () => {
    expect(tree.find('tr').children().length).toBe(3);
  });

  it('Matches the snapshot HeaderTable component', () => {
    expect(toJson(tree)).toMatchSnapshot();
    tree.unmount();
  });
});
