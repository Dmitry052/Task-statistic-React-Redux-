// flow
import axios from 'axios';
import config from './../../configTemp/cabinets/tables/owner.json';

type Action = { type: string, fieldName: ?string, data: boolean | Array<{}> };
type Dispatch = Action => void;

// search name fields from config
const initialFields = {
  loader: false
};
config.sheets.forEach((item: Object) => {
  initialFields[item.name] = [];

  if (item.sourceData.filters.length > 0) {
    item.sourceData.filters.forEach((filter: Object) => {
      if (filter.type === 'select' && filter.sourceData.url !== undefined) {
        initialFields[filter.sourceData.field] = [];
      }
    });
  }
});

// initial fields
const initialState = initialFields;

export const LOADER: string = 'LOADER';

export const INITIAL_DATA: string = 'INITIAL_DATA';
export const INITIAL_DATA_REQUEST: string = 'INITIAL_DATA_REQUEST';

export const INITIAL_OTHER_DATA: string = 'INITIAL_OTHER_DATA';
export const INITIAL_OTHER_DATA_REQUEST: string = 'INITIAL_OTHER_DATA_REQUEST';

export default function table(
  state: Object = initialState,
  action: Object
): Object {
  const { sheet, fieldName, data } = action;

  switch (action.type) {
    case INITIAL_DATA:
      return { ...state, [sheet]: data };
    case INITIAL_OTHER_DATA:
      return { ...state, [fieldName]: data };
    case LOADER:
      return { ...state, loader: data };
    default:
      return state;
  }
}

export const initialData = (
  queryParams: Object,
  url: string,
  displayName: string,
  resolve: (value?: any) => void,
  reject: (value?: any) => void
): Object => (dispatch: Object => void) => {
  axios({
    method: 'get',
    url: `/statistic/${displayName}`,
    params: { queryParams, url, displayName }
  })
    .then((response: Object) => {
      dispatch({ type: LOADER, data: false });
      if (resolve) {
        resolve('OK');
      }
      if (!response.data.error) {
        dispatch({
          type: INITIAL_DATA,
          sheet: displayName,
          data: response.data
        });
      } else {
        // ToDo error
      }
    })
    .catch(() => {
      dispatch({ type: LOADER, data: false });
      if (reject) {
        reject(`* ERROR response * >> ${url}, ${displayName}`);
      }
    });
};

export const showLoader = (): any => (dispatch: Dispatch) => {
  dispatch({ type: LOADER, data: true });
};

export const initialOtherData = (
  queryParams: Object,
  url: string,
  field: string
): any => (dispatch: Dispatch) => {
  axios
    .get(url, {
      params: queryParams
    })
    .then((response: Object) => {
      dispatch({
        type: INITIAL_OTHER_DATA,
        fieldName: field,
        data: response.data.data.data
      });
    });
};
