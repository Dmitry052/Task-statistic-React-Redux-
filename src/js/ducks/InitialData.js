import axios from 'axios';
import { Record } from 'immutable';
// import { put, call, takeEvery } from 'redux-saga/effects';
import config from './../components/main/partner/Table/config.json';

// search name fields from config
const initialFields = {
  loader: false
};
config.sheets.forEach(item => {
  initialFields[item.name] = [];

  if (item.sourceData.filters.length > 0) {
    item.sourceData.filters.forEach(filter => {
      if (filter.type === 'select' && filter.sourceData.url !== undefined) {
        initialFields[filter.sourceData.field] = [];
      }
    });
  }
});

// initial fields
const ReducerRecord = Record(initialFields);

export const LOADER = 'LOADER';

export const INITIAL_DATA = 'INITIAL_DATA';
export const INITIAL_DATA_REQUEST = 'INITIAL_DATA_REQUEST';

export const INITIAL_OTHER_DATA = 'INITIAL_OTHER_DATA';
export const INITIAL_OTHER_DATA_REQUEST = 'INITIAL_OTHER_DATA_REQUEST';

export default function table(state = new ReducerRecord(), action) {
  const { sheet, fieldName, data } = action;

  switch (action.type) {
    case INITIAL_DATA:
      return state.set(sheet, data);
    case INITIAL_OTHER_DATA:
      return state.set(fieldName, data);
    case LOADER:
      return state.set('loader', data);
    default:
      return state;
  }
}

export const initialData = (queryParams, url, displayName) => dispatch => {
  axios({
    method: 'get',
    url,
    params: queryParams,
    onDownloadProgress: () => {
      dispatch({ type: LOADER, data: true });
    }
  }).then(response => {
    console.log('initialData->>>', response.data);
    dispatch({ type: LOADER, data: false });
    dispatch({
      type: INITIAL_DATA,
      sheet: displayName,
      data: response.data.data.data
    });
  });
};

export const initialOtherData = (queryParams, url, field) => dispatch => {
  console.log('initialOtherData->PARAMS->>>', queryParams, url, field);
  axios
    .get(url, {
      params: queryParams
    })
    .then(response => {
      console.log('initialOtherData->RESPONSE>>>', response.data);
      dispatch({
        type: INITIAL_OTHER_DATA,
        fieldName: field,
        data: response.data.data.data
      });
    });
};
