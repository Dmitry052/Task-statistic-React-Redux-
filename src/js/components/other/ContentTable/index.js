import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Badge, FormControl, ControlLabel } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactCountryFlag from 'react-country-flag';
import s from './contentTable.scss';
import { initialData, initialOtherData } from './../../../ducks/InitialData';
import tableFunction from './../../main/partner/Table/functions';
import Footer from './../Footer';
import DropDown from './../DropDown';
import localFormat from './localFormat';

type Props = {
  initialData: (dateFrom: string, dateTo: string, url: string) => void,
  initialOtherData: () => void,
  sheet: mixed,
  loader: boolean,
  configSheet: {
    displayName: string,
    name: string,
    fields: Array<mixed>,

    sourceData: {
      url: string,
      params: Array<string>,
      filters: {
        date: {
          type: string,
          default: string
        }
      }
    }
  }
};

type State = {
  contentTable: Array<mixed>,
  functionResult: mixed,
  startDate: string,
  endDate: string
};

class Period extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      contentTable: [],
      lang: ''
    };
  }
  /* eslint-disable function-paren-newline */
  /* eslint-disable no-mixed-operators */
  componentWillMount() {
    const { name } = this.props.configSheet;
    const { filters, url } = this.props.configSheet.sourceData;
    const { language } = window.navigator;
    const initialParams = {};

    // Local language
    this.setState({
      lang: language
    });
    // first initial
    filters.forEach(item => {
      switch (item.type) {
        case 'date': {
          initialParams[item.name] = this.formatDate(item.default);
          this.setState({
            [item.name]: initialParams[item.name]
          });
          break;
        }
        case 'select': {
          const { sourceData } = item;
          let queryParams = '';
          sourceData.params.forEach(params => {
            switch (params.type) {
              case 'global':
                if (window.sessionStorage.getItem('owner') !== 'true') {
                  queryParams = window.sessionStorage.getItem(params.name);
                }

                this.props.initialOtherData(
                  queryParams,
                  sourceData.url,
                  sourceData.field
                );
                break;
              case 'local':
                break;
              // this part needs for edit
              default:
            }
            return null;
          });

          break;
        }
        default:
          if (item.name) {
            this.setState({
              [item.name]: ''
            });
          }
      }
    });

    this.props.initialData(initialParams, url, name);
  }

  componentWillReceiveProps(nextProps) {
    const { name } = this.props.configSheet;

    this.setState({
      contentTable: nextProps.sheet[name]
    });
  }

  // For filter Date
  onChangeDate = e => {
    const field = e.target.getAttribute('field');
    const { value } = e.target;
    const { sourceData, name } = this.props.configSheet;
    const queryParams = {};

    this.setState({
      [field]: value
    });

    sourceData.filters.forEach(item => {
      if (item.type) {
        queryParams[item.name] = this.state[item.name];
        queryParams[field] = value;
      }
    });

    this.props.initialData(queryParams, sourceData.url, name);
  };

  // For dropdown
  onChangeSelect = e => {
    const { value } = e.target;
    const check = e.target.getAttribute('check');
    // const local = e.target.getAttribute('local');
    const { name } = this.props.configSheet;

    if (value !== '') {
      this.setState({
        contentTable: this.props.sheet[name].filter(item => {
          // const newValue = local === 'true' ? value : Number(value);
          return item[check] == value;
        })
      });
    } else {
      this.setState({
        contentTable: this.props.sheet[name]
      });
    }
  };

  setStyleCol = type => {
    switch (type) {
      case 'number':
        return s.numStyle;
      case 'string':
        return s.strStyle;
      case 'country':
        return s.countryStyle;
      default:
        return type;
    }
  };

  cellTypeFormat = (cell, type, prefix, postfix, prescision) => {
    switch (type) {
      case 'country':
        return this.countryFormat(cell);
      case 'string':
        return `${prefix !== null ? prefix : ''} ${cell}${
          postfix !== null ? postfix : ''
        }`;
      case 'number': {
        const newCell = localFormat.set(this.state.lang, cell, prescision);
        return `${prefix !== null ? prefix : ''} ${newCell}${
          postfix !== null ? postfix : ''
        }`;
      }
      default:
        return cell;
    }
  };

  // For convert date
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

  // For render component + text
  createFormatCountry = (component, value) => (
    <div>
      {component}&nbsp;&nbsp;{value}
    </div>
  );

  // For render BootstrapTable
  countryFormat = cell =>
    this.createFormatCountry(<ReactCountryFlag code={cell} svg />, cell);

  render() {
    const { name, fields, sourceData } = this.props.configSheet;
    const { filters } = sourceData;
    const { contentTable } = this.state;
    const { sheet, loader } = this.props;
    const styleFooter = {};
    const resultFields = {};

    // create fields for footer
    // and create style for field footer
    fields.forEach(item => {
      resultFields[item.field] = 0;

      if (item.type === 'string') {
        styleFooter[item.field] = s.strStyle;
      } else {
        styleFooter[item.field] = s.numStyle;
      }
    });
    // create result data from footer
    fields.forEach(field => {
      if (field.total.fn) {
        const { fn } = field.total;

        if (sheet[name]) {
          contentTable.forEach(item => {
            resultFields[field.field] = tableFunction[fn](
              resultFields[field.field],
              item[field.field]
            );
          });
        }
      } else {
        resultFields[field.field] = field.total.text;
      }
    });

    // Convert format
    const nameResultFields = Object.keys(resultFields);
    nameResultFields.forEach((item, i) => {
      if (typeof resultFields[item] === 'number') {
        resultFields[item] = localFormat.set(
          this.state.lang,
          resultFields[item],
          fields[i].prescision
        );
      }
    });
    console.log('Loader -->>>', loader);
    return (
      <div className={s.mainBlock}>
        {loader === true ? (
          <div className={s.loaderBlock}>
            <i
              className="fa fa-spinner fa-pulse fa-4x fa-fw"
              aria-hidden="true"
            />
          </div>
        ) : null}
        <Row>
          <Col
            lg={12}
            md={12}
            xs={12}
            className={loader === true ? s.tableRow : ''}
          >
            {/* Filters */}
            <Row className={s.filters}>
              {filters.map((item, i) => {
                switch (item.type) {
                  case 'select':
                    return (
                      <DropDown
                        key={`filter-${item.type}`}
                        filterId={i}
                        config={item}
                        column={item.sourceData.params[0].column || null}
                        dataListColumn={this.props.sheet[name]}
                        dataList={this.props.sheet[item.sourceData.field] || []}
                        onChange={this.onChangeSelect}
                      />
                    );
                  default:
                    return (
                      <Col
                        lg={3}
                        md={3}
                        xs={3}
                        key={`filter-${item.name}-${item.type}`}
                      >
                        <ControlLabel>
                          {item.displayName === undefined
                            ? item.name
                            : item.displayName}
                        </ControlLabel>
                        <FormControl
                          type={item.type}
                          field={item.name}
                          value={this.state[item.name]}
                          onChange={this.onChangeDate}
                        />
                      </Col>
                    );
                }
              })}
            </Row>

            {/* Table */}
            <BootstrapTable
              data={this.state.contentTable}
              headerContainerClass={s.headTableDaily}
              striped
              hover
            >
              {fields.map((field, i) => (
                <TableHeaderColumn
                  key={`filed-${field.field}`}
                  width="25%"
                  dataField={field.field}
                  dataSort={field.sortable === true}
                  dataFormat={cell =>
                    this.cellTypeFormat(
                      cell,
                      field.type,
                      field.prefix,
                      field.postfix,
                      field.prescision
                    )
                  }
                  columnClassName={this.setStyleCol(field.type)}
                  isKey={i === 0}
                >
                  <p>
                    {field.displayName === undefined
                      ? field.field
                      : field.displayName}{' '}
                    <Badge>
                      {typeof resultFields[field.field] === 'number'
                        ? resultFields[field.field]
                        : ''}
                    </Badge>
                  </p>
                </TableHeaderColumn>
              ))}
            </BootstrapTable>

            {/* Footer */}
            <Footer resultFields={resultFields} styleFooter={styleFooter} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sheet: state.initial,
  loader: state.initial.loader
});

export default connect(mapStateToProps, {
  initialData,
  initialOtherData
})(withStyles(s)(Period));
