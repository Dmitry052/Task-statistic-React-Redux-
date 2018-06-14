/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import pres from './localFormat';

import {
  createHeader,
  createBodyTable,
  toTableFormat,
  totalData,
  formatTime,
  countryFormat
} from './utils';

import HeaderTableRender from './../../../common/HeaderTable';
import BodyTableRender from './../../../common/BodyTable';
import LoaderRender from './../../../common/Loader';
import FiltersRender from './../../../common/Filters';

import s from './contentTable.scss';
import {
  // initialData,
  initialOtherData
} from './../../../../ducks/ownerInitialData';

import typeof { ContentTable } from './../../../types/owner/contentTable/typesProps';
import typeof { typesState } from './../../../types/owner/contentTable/typesState';

type Props = ContentTable;
type State = typesState;

class Period extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contentTable: [],
      headerConfig: [],
      bodyTable: [],
      queryParams: {}
    };
  }

  componentWillMount() {
    const { fields, sourceData, name } = this.props.configSheet;
    const { filters } = sourceData;
    const initialParams: Object = {};
    const headerConfig = createHeader(fields);
    const { searchParams, newContentTable } = this.props;
    let queryParams: Object = {};
    let contentTable: Array<{}> = [];

    filters.forEach((item: Object) => {
      if (item.type === 'date') {
        initialParams.date = {
          ...initialParams.date,
          [item.name]: formatTime(item.default)
        };
      } else {
        initialParams[item.name] = item.default;
      }
    });

    if (searchParams) {
      if (
        Object.keys(searchParams).length >= Object.keys(initialParams).length
      ) {
        queryParams = this.setParams(searchParams, initialParams)
          ? searchParams
          : initialParams;
      } else {
        queryParams = initialParams;
      }
    } else {
      queryParams = initialParams;
    }

    contentTable = Array.isArray(newContentTable[name])
      ? newContentTable[name]
      : toTableFormat([newContentTable[name]]);

    // set initial params
    this.setState({
      headerConfig,
      queryParams,
      bodyTable: createBodyTable(fields),
      contentTable
    });
  }

  componentWillReceiveProps(nextProps: Object) {
    const { name } = this.props.configSheet;
    const { newContentTable } = nextProps;

    this.setState({
      contentTable: Array.isArray(newContentTable[name])
        ? newContentTable[name]
        : toTableFormat([newContentTable[name]])
    });
  }

  onChangeDate = (
    e: SyntheticEvent<HTMLInputElement> | SyntheticEvent<HTMLSelectElement>
  ) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement
    ) {
      const { target } = e;
      const type = target.getAttribute('type');
      const field = target.getAttribute('field');
      const { sourceData } = this.props.configSheet;
      let queryParams: any = {};

      sourceData.filters.forEach((item: Object) => {
        if (item.type) {
          if (item.type === 'date') {
            queryParams.date = {
              ...queryParams.date,
              [item.name]: this.state.queryParams.date[item.name],
              [field]: target.value
            };
          } else if (type !== 'date') {
            queryParams = {
              ...queryParams,
              [item.name]: this.state.queryParams[item.name],
              [field]: target.value
            };
          } else {
            queryParams = {
              ...queryParams,
              [item.name]: this.state.queryParams[item.name]
            };
          }
        }
      });

      this.setState({
        queryParams
      });

      this.props.initialParamsArr.params = queryParams;
    }
  };

  setParams = (searchParams: Object, queryParams: Object): any => {
    let counterSearchParams = 0;
    let counterQueryParams = 0;

    Object.keys(searchParams).forEach((item: string) => {
      if (item === 'date') {
        Object.keys(searchParams[item]).forEach((item2: string) => {
          if (queryParams[item][item2] !== '') {
            counterQueryParams += 1;
          }
          if (searchParams[item][item2] !== '') {
            counterSearchParams += 1;
          }
        });
      } else {
        if (queryParams[item] !== '') {
          counterQueryParams += 1;
        }
        if (searchParams[item] !== '') {
          counterSearchParams += 1;
        }
      }
    });

    if (counterSearchParams > counterQueryParams) {
      return true;
    } else if (counterSearchParams === counterQueryParams) {
      return false;
    }
    return null;
  };

  // filter Sort
  handleSetState = (item: string, value: string) => {
    this.setState({
      [item]: value
    });
  };

  // For filter Date
  handleUpdateData = () => {
    const { sourceData, name } = this.props.configSheet;
    const { queryParams } = this.state;
    const user = this.props.trigerSSR
      ? 'user-ContentTable'
      : window.localStorage.getItem('user').toLocaleLowerCase();
    const role = this.props.trigerSSR
      ? 'role-ContentTable'
      : window.localStorage.getItem('role');
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

    if (this.props.history) {
      this.props.history.push({
        search: queryStr
      });
    }

    if (role !== 'super') {
      queryParams.user = user;
    }

    this.props.initialDataSheet(queryParams, sourceData.url, name);
  };

  render(): React.Node {
    const { sourceData, name } = this.props.configSheet;
    const { filters } = sourceData;
    const { headerConfig, bodyTable, contentTable, queryParams } = this.state;
    const { loader } = this.props;
    const footerData = totalData(contentTable, bodyTable);

    return (
      <React.Fragment>
        {loader === true ? <LoaderRender styleBlock={s.loaderBlock} /> : null}

        {/* Filters */}
        {filters && filters.length > 0 ? (
          <FiltersRender
            filters={filters}
            role={this.props.trigerSSR ? this.props.role : null}
            queryParams={queryParams}
            onChangeDate={this.onChangeDate}
            handleUpdateData={this.handleUpdateData}
          />
        ) : null}

        {/* Table */}
        <div className={cx(['container', s.tableBlock])}>
          <table className="table table-bordered table-striped">
            <thead className={s.headerStyle}>
              {headerConfig.map(
                (itemTR: Array<Object>, i: number): React.Node | null => {
                  if (itemTR.length !== 0) {
                    return (
                      <HeaderTableRender
                        itemTR={itemTR}
                        contentTable={contentTable}
                        handleSetState={this.handleSetState}
                        name={name}
                        index={i}
                      />
                    );
                  }
                  return null;
                }
              )}
            </thead>
            <tbody className={s.tbodyStyle}>
              {contentTable.length > 0 ? (
                contentTable.map(
                  (itemTR: Object, i: number): React.Node => (
                    <BodyTableRender
                      bodyTable={bodyTable}
                      itemTR={itemTR}
                      index={i}
                      formatTime={formatTime}
                      pres={pres}
                      countryFormat={countryFormat}
                      ssr={this.props.trigerSSR}
                    />
                  )
                )
              ) : (
                // if in response no data
                <tr>
                  <td colSpan={bodyTable.length}>No data</td>
                </tr>
              )}
              {/* Footer - Total */}
              <tr>
                {contentTable.length > 0
                  ? bodyTable.map(
                      (item: Object, i: number): React.Node | null => {
                        const key = Object.keys(item)[0];
                        const counter = i;
                        if (Object.keys(footerData).length > 0) {
                          return (
                            <th key={`tr-footer-${counter}`}>
                              {footerData[key]}
                            </th>
                          );
                        }
                        return null;
                      }
                    )
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  loader: state.initialOwner.loader
});

export default connect(
  mapStateToProps,
  {
    // initialData,

    initialOtherData
  }
)(withStyles(s)(Period));
