/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { initialData, showLoader } from './../../../../ducks/ownerInitialData';
import ContentTable from './../ContentTable';
import config from './../../../../../configTemp/cabinets/tables/owner.json';
import { formatTime } from './../ContentTable/utils';
import configSSR from './../../../../../src/config.json';

import s from './table.scss';

type Props = {
  role: string,
  query: Object,
  history: Object,
  trigerSSR: boolean,
  sheetData: Array<{}>,
  showLoader: () => void,
  initialData: (params: any, url: string, name: string) => void
};

type State = {
  user: ?string,
  defaultPage: number,
  searchParams: Object,
  sheets: Array<Object>,
  initialParamsArr: Array<Object>
};

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sheets: [],
      defaultPage: 1,
      searchParams: {},
      initialParamsArr: [],
      user: !configSSR.ssr ? Object.keys(window.sessionStorage)[0] : 'owner'
    };
  }
  componentWillMount = () => {
    const { user } = this.state;
    const urlArr = !configSSR.ssr
      ? this.props.history.location.pathname
          .split('/')
          .filter((item: string): boolean => item !== '')
      : ['statistic'];

    let checkDefault = false;
    let copySheets: Array<Object> = [];

    switch (user) {
      default:
        this.setState({ sheets: config.sheets });
        copySheets = config.sheets;
        break;
    }

    if (urlArr.length <= 1) {
      copySheets.forEach((item: Object, i: number) => {
        const params: Object =
          item.sourceData.filters.length > 0
            ? this.filtersDataToParams(item.sourceData.filters)
            : {};

        this.state.initialParamsArr.push({
          params,
          url: item.sourceData.url,
          name: item.name
        });

        // if have load parametr

        if (item.load) {
          checkDefault = true;
          this.setState({ defaultPage: i + 1 });
          if (!this.props.trigerSSR) {
            this.initialData(params, item.sourceData.url, item.name);
          }
        }
      });

      // default load tab
      if (!checkDefault && !configSSR.ssr) {
        const params: Object =
          copySheets[0].sourceData.filters.length > 0
            ? this.filtersDataToParams(copySheets[0].sourceData.filters)
            : {};

        this.initialData(
          params,
          copySheets[0].sourceData.url,
          copySheets[0].name
        );
      }
    } else {
      copySheets.forEach((item: Object, i: number) => {
        const params: Object =
          item.sourceData.filters.length > 0
            ? this.filtersDataToParams(item.sourceData.filters)
            : {};

        this.state.initialParamsArr.push({
          params,
          url: item.sourceData.url,
          name: item.name
        });

        if (urlArr[urlArr.length - 1] === item.name) {
          this.setState(
            (): Object => {
              const obj = { defaultPage: i + 1 };
              return obj;
            }
          );

          if (!this.props.trigerSSR) {
            this.initialData(params, item.sourceData.url, item.name);
          }
        }
      });
    }
  };

  getParameterByName = (name: string, url: ?string): string | null => {
    let newUrl: string = '';
    if (!url) {
      newUrl = window.location.href;
    }
    /* eslint-disable no-useless-escape */
    const newName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${newName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(newUrl);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  filtersDataToParams = (filters: Array<Object>): Object => {
    const query: Object = {};
    filters.forEach((item: Object) => {
      if (item.type === 'date') {
        query.date = {
          ...query.date,
          [item.name]: formatTime(item.default)
        };
      } else {
        query[item.name] = item.default;
      }
    });

    return query;
  };

  queryToStr = (queryParams: Object): string => {
    let queryStr: string = '';

    Object.keys(queryParams).forEach((item: string, i: number) => {
      if (i === 0) {
        if (typeof queryParams[item] === 'object') {
          queryStr = '?';
          Object.keys(queryParams[item]).forEach((key: string) => {
            queryStr = `${queryStr}&${key}=${queryParams[item][key]}`;
          });
        } else {
          queryStr = `?${item}=${queryParams[item]}`;
        }
      } else {
        queryStr = `${queryStr}&${item}=${queryParams[item]}`;
      }
    });
    return queryStr;
  };

  initialData = (params: Object, url: string, name: string) => {
    const user = window.localStorage.getItem('user').toLocaleLowerCase();
    const role = window.localStorage.getItem('role');
    if (role !== 'super') {
      /* eslint-disable no-param-reassign */
      params.user = user;
    }
    const searchParams: Object = {};
    this.state.initialParamsArr.forEach((item: Object) => {
      if (item.name === name) {
        Object.keys(item.params).forEach((key: string) => {
          if (key === 'date') {
            searchParams.date = {
              from: this.getParameterByName('from'),
              to: this.getParameterByName('to')
            };
          } else {
            const resultParse = this.getParameterByName(key);
            if (resultParse) {
              searchParams[key] = resultParse;
            } else {
              searchParams[key] = '';
            }
          }
        });
      }
    });
    if (Object.keys(searchParams).length === 0) {
      this.setState({ searchParams: {} });
      this.props.showLoader();
      this.props.initialData(params, url, name);
    } else {
      this.setState({ searchParams });
      this.props.showLoader();
      this.props.initialData(searchParams, url, name);
    }

    this.props.history.push({
      pathname: `/statistic/${name}`,
      search: this.queryToStr(searchParams)
    });
  };

  handleTab = (e: Object) => {
    if (e.target) {
      const { target } = e;
      const id = target.getAttribute('data');
      const { params, url, name } = this.state.initialParamsArr[id];

      this.props.history.push({ pathname: name, search: '' });

      if (!configSSR.ssr) {
        this.initialData(params, url, name);
      }
    }
  };

  render(): React$Element<string> {
    const { sheets, defaultPage, initialParamsArr, searchParams } = this.state;

    let queryFromSSR;

    if (this.props.query) {
      queryFromSSR = {
        date: {
          from: this.props.query.from || '',
          to: this.props.query.to || ''
        },
        status: this.props.query.status || '',
        id: this.props.query.id || '',
        user: this.props.query.user || ''
      };
    }

    return (
      <div className="container">
        <div className="row">
          <div className={cx(['col-lg', s.tableContainer])}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {sheets.map(
                (sheet: Object, i: number): React$Element<string> => {
                  const sheetName =
                    sheet.displayName === undefined
                      ? sheet.name
                      : sheet.displayName;
                  return (
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          i === defaultPage - 1 ? 'active' : ''
                        }`}
                        aria-controls={sheetName}
                        aria-selected={i === defaultPage - 1 || false}
                        id={`pill-${sheetName}-stab`}
                        data-toggle="tab"
                        data={i}
                        href={`#${sheetName}`}
                        role="tab"
                        onClick={this.handleTab}
                      >
                        {sheetName}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>

            <div className="tab-content" id="tableContent">
              {sheets.map(
                (sheet: Object, i: number): React$Element<string> => (
                  <div
                    className={`tab-pane fade ${
                      i === defaultPage - 1 ? 'show active' : ''
                    }`}
                    id={
                      sheet.displayName === undefined
                        ? sheet.name
                        : sheet.displayName
                    }
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {sheet.sourceData.filters.length === 0 ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          const params = {};
                          const { url, name } = initialParamsArr[i];
                          this.initialData(params, url, name);
                        }}
                      >
                        <i className="fa fa-refresh" aria-hidden="true" />
                      </button>
                    ) : null}

                    <ContentTable
                      role={this.props.role}
                      configSheet={sheet}
                      newContentTable={this.props.sheetData}
                      initialDataSheet={this.initialData}
                      trigerSSR={this.props.trigerSSR}
                      history={this.props.history}
                      // ERROR
                      // searchParams={
                      //   !configSSR.ssr ? searchParams : queryFromSSR
                      // }
                      initialParamsArr={initialParamsArr[i]}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  store: state.table,
  sheetData: state.initialOwner,
  ssr: state.authReducer.ssr
});

export default connect(
  mapStateToProps,
  { initialData, showLoader }
)(withStyles(s)(Table));
