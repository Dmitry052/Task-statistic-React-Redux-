// @flow
import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Toggler from './../Toggler';
import s from './filters.scss';

type Props = {
  // role: string,
  filters: Array<{}>,
  queryParams: Object,
  onChangeDate: () => void,
  handleUpdateData: () => void
};

export const Filters = (props: Props): Fragment => {
  const { filters, queryParams, onChangeDate, handleUpdateData } = props;
  // const role = props.role ? props.role : window.localStorage.getItem('role');

  return (
    <Fragment>
      <Toggler name="Filters" id="collapseFilters" />
      <div
        id="collapseFilters"
        className={cx(['collapse show', s.filtersBlock])}
      >
        <div className={cx([s.filters, 'container'])}>
          {filters.map(
            (item: Object, i: number): React$Element<string> | null => {
              switch (item.type) {
                case 'date':
                  return (
                    <div key={`filter-${item.name}-${item.type}`}>
                      <label htmlFor={`${item.displayName}-${i}`}>
                        <span>
                          {item.displayName === undefined
                            ? item.name
                            : item.displayName}
                        </span>
                        <input
                          type={item.type}
                          className="form-control"
                          id={`${item.displayName}-${i}`}
                          field={item.name}
                          value={queryParams.date[item.name]}
                          onChange={onChangeDate}
                        />
                      </label>
                    </div>
                  );
                case 'string':
                  return (
                    <div key={`filter-${item.name}-${item.type}`}>
                      <label htmlFor={`${item.displayName}-${i}`}>
                        <span>
                          {item.displayName === undefined
                            ? item.name
                            : item.displayName}
                        </span>
                        <input
                          className="form-control"
                          id={`${item.displayName}-${i}`}
                          type={item.type}
                          field={item.name}
                          value={queryParams[item.name]}
                          onChange={onChangeDate}
                        />
                      </label>
                    </div>
                  );
                case 'selectx':
                  return (
                    <div key={`filter-${item.name}-${item.type}`}>
                      <label htmlFor="exampleFormControlSelect1">
                        <span>
                          {item.displayName === undefined
                            ? item.name
                            : item.displayName}
                        </span>
                        <select
                          className="form-control"
                          field={item.name}
                          onChange={onChangeDate}
                          id={`${item.displayName}-${i}`}
                          value={queryParams[item.name]}
                        >
                          <option value={null} />
                        </select>
                      </label>
                    </div>
                  );
                default:
                  return null;
              }
            }
          )}

          <div className={s.btnUpdate}>
            <button className="btn btn-primary" onClick={handleUpdateData}>
              Update
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(s)(Filters);
