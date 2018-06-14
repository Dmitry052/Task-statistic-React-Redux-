/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './sort.scss';

type Props = {
  handleSetState: (item: string, value: any) => void,
  path: string,
  contentTable: Array<{}>,
  type: string,
  field: string
};

type State = {
  status: boolean
};

export class Sort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      status: true
    };
  }

  handleStatus = (): Array<{}> | null => {
    const status = !this.state.status;
    this.setState({
      status
    });
    return this.handleFilter();
  };

  sortUp = (a: any, b: any): any => {
    const { field, path, type } = this.props;
    const key = path.split('.').length > 1 ? path : field;

    if (this.state.status) {
      if (type === 'date') {
        return new Date(a[key]) - new Date(b[key]);
      }
      return a[key] - b[key];
    }
    if (type === 'date') {
      return new Date(b[key]) - new Date(a[key]);
    }
    return b[key] - a[key];
  };

  handleFilter = (): Array<{}> | null => {
    const { contentTable, handleSetState, path } = this.props;
    const result: Array<{}> = contentTable.sort(this.sortUp);

    if (path) {
      handleSetState('contentTable', result);
      return result;
    }
    return null;
  };

  render(): React$Element<string> {
    const { status } = this.state;

    if (status) {
      return (
        <i
          className={cx(['fa fa-sort-amount-desc'])}
          aria-hidden="true"
          onClick={this.handleStatus}
        />
      );
    }
    return (
      <i
        className={cx(['fa fa-sort-amount-asc'])}
        aria-hidden="true"
        onClick={this.handleStatus}
      />
    );
  }
}

export default withStyles(s)(Sort);
