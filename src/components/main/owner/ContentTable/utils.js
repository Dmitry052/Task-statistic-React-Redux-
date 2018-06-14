/* global navigator */
/* @flow */
/* eslint-disable no-param-reassign */
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { columnFunction } from './../../../../../configTemp/cabinets/functions/owner';
import pres from './localFormat';

const counter = {
  value: 0,
  count: (num: number): any => (): any => {
    counter.value += num;
  },
  clearCouner: (): any => {
    counter.value = 0;
  }
};

export const formatDate = (time: string): string => {
  const date = new Date(time);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const min =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const sec =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
};

const countRecurs = (data: Array<{}>) => {
  data.forEach((item: Object) => {
    if (item.group && item.items[0].group) {
      countRecurs(item.items);
    } else if (item.items) {
      counter.count(item.items.length)();
    } else {
      counter.count(1)();
    }
  });
};

const countChild = (arr: Array<Array<Object>>) => {
  arr.forEach((item: Array<Object>, i: number) => {
    item.forEach((itemNext: Object, j: number) => {
      if (itemNext.type === 'object') {
        countRecurs(itemNext.items);
        itemNext.colspan = counter.value;
        itemNext.localIndex = i * 10 + j;
        counter.clearCouner();
      } else {
        itemNext.localIndex = i * 10 + j;
      }
    });
  });
};
// create header
const recursItem = (
  path: string,
  groupItem: Object,
  resultConfig: Array<Array<Object>>,
  index: number
): Array<Array<Object>> => {
  if (groupItem.group === true) {
    const { items } = groupItem;

    resultConfig[index].push(groupItem);
    resultConfig.push([]);
    index += 1;

    items.forEach((item: Object) => {
      if (groupItem.group) {
        recursItem(
          `${path.toLowerCase()}.${item.displayName.toLowerCase()}`,
          item,
          resultConfig,
          index
        );
      }
    });
  } else {
    resultConfig[index].push(groupItem);
    const indexLastPath = resultConfig[index].length - 1;
    resultConfig[index][indexLastPath].path = path;
  }
  return resultConfig;
};

export const createHeader = (config: Array<Object>): Array<Array<Object>> => {
  const index = 0;
  const resultConfig: Array<Array<Object>> = [[]];
  const resultArr: Array<Array<Object>> = [];

  config.forEach((item: Object) => {
    if (item.group) {
      recursItem(item.displayName, item, resultConfig, index);
    } else {
      resultConfig[index].push(item);
      const indexLastPath = resultConfig[index].length - 1;
      resultConfig[index][indexLastPath].path = item.displayName.toLowerCase();
    }
  });

  // clean bug
  resultConfig.forEach((item: Array<Object>) => {
    if (item.length > 0) {
      resultArr.push(item);
    }
  });

  countChild(resultArr);
  return resultArr;
};

// Create body table config
const pathData = (
  path: string,
  obj: Object,
  bodyTable: Array<{}>
): Array<{}> => {
  if (obj.group) {
    obj.items.forEach((item: Object) => {
      if (obj.group) {
        pathData(
          `${path.toLowerCase()}.${item.displayName.toLowerCase()}`,
          item,
          bodyTable
        );
      }
    });
  } else {
    const fn = obj.total ? obj.total.fn : null;
    const text = obj.total ? obj.total.text : null;
    const precision = obj.precision ? obj.precision : null;
    const nowrap = obj.nowrap ? obj.nowrap : null;

    if (fn) {
      bodyTable.push({ [path]: obj.type, fn, precision, nowrap });
    } else {
      bodyTable.push({ [path]: obj.type, text, precision, nowrap });
    }
  }
  return bodyTable;
};

export const createBodyTable = (config: Array<Object>): Array<Object> => {
  const bodyTable: Array<Object> = [];

  config.forEach((item: Object) => {
    if (item.group) {
      pathData(item.displayName, item, bodyTable);
    } else {
      const text = item.total ? item.total.text : null;
      const fn = item.total ? item.total.fn : null;
      const precision = item.precision ? item.precision : null;
      const nowrap = item.nowrap ? item.nowrap : null;

      if (fn) {
        bodyTable.push({ [item.field]: item.type, fn, precision, nowrap });
      } else {
        bodyTable.push({ [item.field]: item.type, text, precision, nowrap });
      }
    }
  });

  return bodyTable;
};

// New data for table format
const formatDataForTale = (
  path: string,
  data: Object,
  resultObject: Object
) => {
  Object.keys(data).forEach((item: string) => {
    if (data[item] instanceof Object) {
      formatDataForTale(`${path}.${item}`, data[item], resultObject);
    } else {
      resultObject[`${path}.${item}`] = data[item];
    }
  });
};

export const toTableFormat = (data: Array<Object>): Array<Object> => {
  const resultArr = [];
  let resultObject = {};

  if (data.length > 0) {
    let dataArr: Array<Object> = [];
    // input validation
    if (Array.isArray(data[0].data)) {
      dataArr = data[0].data;
    } else if (Array.isArray(data[0].data.data)) {
      dataArr = data[0].data.data;
    }

    dataArr.forEach((item: Object) => {
      Object.keys(item).forEach((param: string) => {
        if (item[param] instanceof Object) {
          if (item[param] instanceof Array) {
            resultObject[param] = item[param].join(', ');
          } else {
            formatDataForTale(param, item[param], resultObject);
          }
        } else {
          resultObject[param] = item[param];
        }
      });
      resultArr.push(resultObject);
      resultObject = {};
    });
  }

  return resultArr;
};

export const totalData = (
  resultArr: Array<Object>,
  bodyTable: Array<Object>
): Object => {
  const totalObject = {};
  let countForRender = 0;

  if (resultArr.length > 0) {
    resultArr.forEach((item: Object) => {
      bodyTable.forEach(
        (row: Object): any => {
          const key = Object.keys(row)[0];
          const total = Object.keys(row)[1];

          if (item[key] || item[key] === 0) {
            switch (total) {
              case 'text':
                totalObject[key] = row[total];
                return null;
              case 'fn': {
                const nameFunc = row[total];
                if (totalObject[key]) {
                  totalObject[key] = columnFunction[nameFunc](
                    Number(totalObject[key]),
                    Number(item[key])
                  );
                } else if (row[total] !== null) {
                  totalObject[key] = item[key];
                }
                return null;
              }
              default:
                return null;
            }
          }
          return null;
        }
      );
    });
  }

  // Formated total TH
  Object.keys(totalObject).forEach((item: string) => {
    if (totalObject[item] && typeof totalObject[item] !== 'string') {
      totalObject[item] = pres.set(navigator.language, totalObject[item], 2);
      countForRender += 1;
    }
  });

  return countForRender > 0 ? totalObject : {};
};

export const formatTime = (time: string, str: ?boolean): string | null => {
  let newTime;
  let date;

  if (time !== null) {
    if (str) {
      date = new Date(time);
    } else {
      newTime = Math.floor(new Date() / 1000) + 86400 * Number(time);
      date = new Date(newTime * 1000);
    }

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return null;
};

// country
const createFormatCountry = (component: any, value: string): any => (
  <div>
    {component}&nbsp;&nbsp;{value}
  </div>
);

export const countryFormat = (cell: string): void =>
  createFormatCountry(<ReactCountryFlag code={cell} svg />, cell);
