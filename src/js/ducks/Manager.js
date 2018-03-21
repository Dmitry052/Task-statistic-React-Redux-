import { Record } from 'immutable';
import axios from 'axios';

const ReducerRecord = Record({
  data: [
    {
      id: 1,
      account_id: 2,
      email: 'test@mail.ru',
      date_create: '2018-02-27',
      date_confirm_expired: '2018-03-01',
      date_update: '',
      status: 'NEW',
      doc: [
        {
          id: 1,
          urlImg:
            'http://school-romanowo.ru/wp-content/uploads/2015/12/%D0%A1%D0%BA%D0%B0%D0%BD-%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%D0%B0-%E2%84%9666-%D0%9E-%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D1%85-%D0%B8-%D0%BC%D0%B5%D1%81%D1%82%D0%B5-%D0%BF%D0%BE%D0%B4%D0%B0%D1%87%D0%B8-%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-007.jpg',
          validate: false
        },
        {
          id: 2,
          urlImg: 'https://s.ura.news/images/news/upload/exposcan.jpg',
          validate: false
        },
        {
          id: 3,
          urlImg:
            'http://pp.userapi.com/c406331/v406331419/2b7d/XJEkvx7F9Yc.jpg',
          validate: false
        },
        {
          id: 4,
          urlImg: 'http://www.transvip-kzn.ru/_pu/1/90382511.jpg',
          validate: false
        }
      ],
      validateInf: [
        {
          field: 'firstName',
          value: 'John',
          validate: false
        },
        {
          field: 'lastName',
          value: 'Peterson',
          validate: false
        },
        {
          field: 'adress',
          value: 'Washington, D.C',
          validate: false
        },
        {
          field: 'email',
          value: 'test@mail.ru',
          validate: false
        }
      ]
    }
  ]
});

export const INITIAL_DATA = 'INITIAL_DATA';

export default function table(state = new ReducerRecord(), action) {
  switch (action.type) {
    case INITIAL_DATA:
      return state.set('data', action.data);
    default:
      return state;
  }
}

export const initialDataManager = (queryParams, url) => dispatch => {
  // console.log('action ->', queryParams, url);
  axios
    .get(url, {
      params: queryParams
    })
    .then(response => {
      // console.log('response initialDataManager ->', response.data);
      // dispatch({
      //   type: INITIAL_DATA,
      //   data: response.data.data.data
      // });
    });
};
