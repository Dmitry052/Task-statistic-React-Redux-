/* eslint-disable function-paren-newline */
/* flow */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import config from './config.json';
import s from './table.scss';
import Filters from './../filters';
import Expand from './../expand';
import { initialDataManager } from './../../../../ducks/Manager';

type Props = {
  store: Array<mixed>,
  initialDataManager: (queryParams: any, url: string) => void
};

class Manager extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      contentTable: [],
      filtersValue: {}
    };
  }
  componentWillMount = () => {
    const keys = Object.keys(config.sourceData);
    const { sourceData, filters } = config;
    const queryParams = {};
    const initialFilters = {};

    // initial query for response data
    keys.forEach(item => {
      if (item !== 'url') {
        queryParams[item] = sourceData[item];
      }
    });
    this.props.initialDataManager(queryParams, sourceData.url);

    // initial state for filters
    filters.forEach(filter => {
      if (filter.type === 'date') {
        initialFilters[filter.name] = this.formatDate(filter.default);
      } else {
        initialFilters[filter.name] = filter.default;
      }
    });

    this.setState({
      contentTable: this.props.store.filter(
        item =>
          new Date(initialFilters.to) <= new Date(item.date_create) &&
          new Date(item.date_confirm_expired) <= new Date(initialFilters.from)
      ),
      filtersValue: initialFilters
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  rowStyle = row => {
    switch (row.status) {
      case 'CONFIRMED':
        return s.rowConfirmStyle;
      case 'CANCELED':
        return s.rowCanceledStyle;
      default:
        return null;
    }
  };

  handleDateFilter = e => {
    const field = e.target.getAttribute('name');
    const { value } = e.target;
    const filtersValue = { ...this.state.filtersValue };

    if (field === 'to') {
      filtersValue[field] = value;
      this.setState({
        filtersValue: { ...filtersValue },
        contentTable: this.props.store.filter(
          item =>
            new Date(value) <= new Date(item.date_create) &&
            new Date(item.date_confirm_expired) <=
              new Date(this.state.filtersValue.from)
        )
      });
    } else if (field === 'from') {
      filtersValue[field] = value;
      this.setState({
        filtersValue: { ...filtersValue },
        contentTable: this.props.store.filter(
          item =>
            new Date(this.state.filtersValue.to) <=
              new Date(item.date_create) &&
            new Date(item.date_confirm_expired) <= new Date(value)
        )
      });
    }
    // console.log(field, value);
  };

  handleEmailFilter = e => {
    const field = e.target.getAttribute('name');
    const { value } = e.target;

    if (value !== '') {
      this.setState({
        filtersValue: {
          [field]: value
        },
        contentTable: this.props.store.filter(item => item.email === value)
      });
    } else {
      this.setState({
        filtersValue: {
          [field]: value
        },
        contentTable: this.props.store
      });
    }
  };

  handleStatusFilter = e => {
    const field = e.target.getAttribute('name');
    const { value } = e.target;

    if (value !== '') {
      this.setState({
        filtersValue: {
          [field]: value
        },
        contentTable: this.props.store.filter(item => item.status === value)
      });
    } else {
      this.setState({
        filtersValue: {
          [field]: value
        },
        contentTable: this.props.store
      });
    }
  };

  expandComponent = row => <Expand contentRow={row} />;
  /* eslint-disable no-mixed-operators */
  formatDate = time => {
    const newTime = Math.floor(new Date() / 1000) + 86400 * Number(time);
    const date = new Date(newTime * 1000);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  render() {
    const { columns, filters } = config;
    const { contentTable, filtersValue } = this.state;

    return (
      <Grid>
        <Row>
          <Col lg={12} md={12} xs={12}>
            <Filters
              filters={filters}
              defaultValue={filtersValue}
              dateFilter={this.handleDateFilter}
              emailFilter={this.handleEmailFilter}
              statusFilter={this.handleStatusFilter}
            />

            <BootstrapTable
              data={contentTable}
              expandableRow={() => true}
              expandComponent={this.expandComponent}
              headerContainerClass={s.headTableDaily}
              trClassName={this.rowStyle}
              striped
            >
              {columns.map((item, i) => (
                <TableHeaderColumn
                  key={`filed-${item.field}`}
                  dataField={item.field}
                  isKey={i === 0}
                  width="25%"
                  dataSort
                >
                  {item.columnName}
                </TableHeaderColumn>
              ))}
            </BootstrapTable>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  store: state.manager.data
});

export default connect(mapStateToProps, { initialDataManager })(
  withStyles(s)(Manager)
);
