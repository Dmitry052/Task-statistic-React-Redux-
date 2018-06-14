import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {
  formatDate,
  createHeader,
  createBodyTable,
  toTableFormat,
  totalData,
  formatTime,
  countryFormat
} from './../utils';
import data from './test.data.json';
import config from './test.config.json';

configure({ adapter: new Adapter() });

describe('Utils methods', () => {
  let contentTable;
  let bodyTable;
  let resTotalData;

  it('formatDate', () => {
    const time = '2018-04-16T11:07:27.000Z';
    expect(formatDate(time)).toBe('2018-04-16 14:07:27');
  });

  it('createHeader', () => {
    expect(createHeader(config.fields).length).toBe(3);
  });

  it('createBodyTable', () => {
    bodyTable = createBodyTable(config.fields);
    expect(bodyTable.length).toBe(10);
  });

  it('toTableFormat', () => {
    contentTable = toTableFormat([data]);
    expect(contentTable.length).toBe(6);
  });

  it('totalData', () => {
    resTotalData = totalData(contentTable, bodyTable);
    expect(Object.keys(resTotalData).length).toBe(10);
  });

  it('formatTime', () => {
    const now = formatDate(new Date()).split(' ')[0];
    expect(formatTime(0)).toBe(now);
  });

  it('countryFormat', () => {
    const tree = shallow(countryFormat('ru'));
    expect(toJson(tree)).toMatchSnapshot();
  });
});
