/* @flow */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';

import { sheets } from './../../../configTemp/cabinets/tables/owner.json';
import formatTime from './../libs/routes/utils';
import reducers from './../../../src/redux';
import ContextProvider from './../../../src/components/App';
import Client from './client';
import Html from './html';

const store = createStore(reducers);

const setDataToState = (sheet: string, dataRedux: Array<{}>) => {
  store.dispatch({
    type: 'INITIAL_DATA',
    sheet,
    data: dataRedux
  });
};

export const reqInitialData = (
  API_URL: string,
  APP_PORT: string,
  user: string,
  role: string,
  query: Object
): Array<{}> => {
  const promiseArr: Array<{}> = [];

  console.log(
    '* API ->',
    `${API_URL}:${APP_PORT}`,
    '* Request data SSR ->',
    query
  );

  if (sheets) {
    sheets.forEach((sheet: Object) => {
      const url = `${API_URL}:${APP_PORT}${sheet.sourceData.url}`;

      const data = {
        date: {
          from: query.from ? query.from : formatTime('-1'),
          to: query.to ? query.to : formatTime('1')
        },
        status: query.status && query.status !== '' ? query.status : '',
        user: role === 'super' ? query.user : user,
        id: query.id ? query.id : ''
      };

      promiseArr.push(
        axios({
          method: 'post',
          url,
          data
        })
          .then((response: Object) => {
            setDataToState(sheet.name, response.data.data);
          })
          .catch(() => {
            setDataToState(sheet.name, []);
          })
      );
    });
  }
  return promiseArr;
};

const ssrData = (
  login: string,
  payformUrl: string,
  query: Object,
  role: string
): string => {
  const css: Set<any> = new Set();
  const data: Object = {};
  /* eslint-disable no-underscore-dangle */
  const insertCss = (...styles: Array<Object>): any => {
    styles.forEach((style: Object): Object => css.add(style._getCss()));
  };

  const context = {
    insertCss
  };

  let listUrl = [];
  /* eslint-disable global-require */
  const userConfig = require(`./../../../configTemp/cabinets/tables/owner.json`);

  if (userConfig.sheets) {
    listUrl = userConfig.sheets.map(
      (item: Object): Object => {
        const obj = {
          queryParams: {},
          url: item.sourceData.url,
          displayName: item.name
        };
        return obj;
      }
    );
  }

  const finalState = store.getState();

  data.title = 'Moto';
  data.body = renderToString(
    <ContextProvider context={context}>
      <Provider store={store}>
        <Client
          listUrl={listUrl}
          user={login}
          payform_url={payformUrl}
          query={query}
          role={role}
        />
      </Provider>
    </ContextProvider>
  );
  data.styles = [{ id: 'css', cssText: [...css].join('') }];

  return Html(data, finalState);
};

export default ssrData;
