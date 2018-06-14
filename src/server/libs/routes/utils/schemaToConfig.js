// @flow
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');

type Column = {
  field: string,
  displayName: string,
  prefix: null | string,
  postfix: null | string,
  nowrap: boolean,
  sortable: boolean,
  group: boolean,
  type: string,
  items: Array<{}>
};

/* eslint-disable no-param-reassign */
const setStandartProps = (column: Column, prop: string) => {
  column.field = prop;
  column.displayName = prop.toLocaleUpperCase();
  column.prefix = null;
  column.postfix = null;
  column.nowrap = false;
  column.sortable = false;
};

const parseObject = (
  props: Object,
  column: Column,
  displayName: string
): Column => {
  const { properties }: { properties: Object } = props;

  column.displayName = displayName.toLocaleUpperCase();
  column.group = true;
  column.type = 'object';
  column.items = [];

  Object.keys(properties).forEach((prop: string) => {
    if (properties[prop].type === 'object') {
      const newColumn: Object = {
        displayName: prop.toLocaleUpperCase()
      };
      column.items.push(newColumn);
      parseObject(properties[prop], newColumn, prop);
    } else {
      column.items.push({
        field: prop,
        displayName: prop.toLocaleUpperCase(),
        type: properties[prop].type,
        total: properties[prop].totalRow
      });
    }
  });

  return column;
};

const parseProps = (props: Object): Array<Object> => {
  const resultFields: Array<Object> = [];

  if (props.data) {
    if (props.data.items) {
      if (props.data.items.properties) {
        // if mixed properties
        const { properties } = props.data.items;

        Object.keys(properties).forEach((prop: string) => {
          const column: Object = {};

          if (properties[prop].type !== 'object') {
            if (Array.isArray(properties[prop].type)) {
              column.type =
                properties[prop].type.indexOf('data') === -1
                  ? 'string'
                  : 'data';
            } else {
              if (properties[prop].format) {
                if (properties[prop].format === 'date-time') {
                  column.type = 'date';
                }
              } else {
                column.type = properties[prop].type;
              }
              column.total = properties[prop].totalRow;
            }

            setStandartProps(column, prop);
            resultFields.push(column);
          } else {
            resultFields.push(parseObject(properties[prop], column, prop));
          }
        });
      }
    }
  } else {
    // if standart properties
    Object.keys(props).forEach((prop: string) => {
      const column: Object = {};

      setStandartProps(column, prop);
      if (props[prop].type) {
        if (props[prop].type !== 'array') {
          column.type = props[prop].type;
          column.total = props[prop].totalRow;
        } else if (props[prop].items) {
          column.type = props[prop].items.type;
          column.total = props[prop].totalRow;
        }
      } else if (props[prop].format) {
        if (props[prop].format === 'date-time') {
          column.type = 'date';
          column.total = props[prop].totalRow;
        }
      }

      resultFields.push(column);
    });
  }

  return resultFields;
};

const parseSchema = (schema: Object, env: mixed): Array<Object> => {
  const apiConfig = require('./../../../../../configTemp/configConverter')[
    env
  ];
  const resultSheets: Array<Object> = [];

  Object.keys(schema).forEach((item: string) => {
    const newParams: Object = {};
    const { properties }: { properties: Object } = schema[item].response;

    newParams.name = item;
    newParams.displayName = item.toLocaleUpperCase();
    newParams.sourceData = {
      url: `${apiConfig.url}/${item}`,
      filters: []
    };

    if (properties) {
      newParams.fields = parseProps(properties);
    }

    resultSheets.push(newParams);
  });

  return resultSheets;
};

const schemaToConfig = (
  login: string,
  env: mixed,
  resolve: (status: string) => void,
  reject: (status: string) => void
) => {
  // const user = login.toLowerCase();
  const result: { sheets: Array<Object> } = { sheets: [] };

  try {
    const schema = require(`./../../../../../config_moto/cabinets/tables/${login}.schema.js`);

    if (schema.GET) {
      result.sheets = parseSchema(schema.GET, env);
    } else if (schema.POST) {
      result.sheets = parseSchema(schema.POST, env);
    }

    if (result) {
      fs.writeFile(
        `./config_moto/cabinets/tables/${login}.json`,
        JSON.stringify(result),
        (err: any) => {
          if (err) reject('Not write new config file');
          resolve('Create new config file for table');
        }
      );
    }
  } catch (err) {
    reject(err);
  }
};

module.exports = schemaToConfig;
