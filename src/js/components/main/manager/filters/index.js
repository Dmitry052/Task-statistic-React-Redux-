/* eslint-disable function-paren-newline */
/* flow */
import React from 'react';
import { Row, Col, ControlLabel, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './filters.scss';

type Props = {
  filters: any,
  defaultValue: any,
  dateFilter: () => void,
  emailFilter: () => void,
  statusFilter: () => void
};

class Filters extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }
  /* eslint-disable react/jsx-indent */
  render() {
    const {
      filters,
      defaultValue,
      dateFilter,
      emailFilter,
      statusFilter
    } = this.props;

    return (
      <Row className={s.filtersStyle}>
        {filters.map(filter => {
          switch (filter.type) {
            case 'date':
              return (
                <Col lg={2} key={`filter-${filter.name}`}>
                  <ControlLabel>{filter.displayname}</ControlLabel>
                  <FormControl
                    type={filter.type}
                    name={filter.name}
                    defaultValue={defaultValue[filter.name]}
                    onChange={dateFilter}
                  />
                </Col>
              );
            case 'text':
              return (
                <Col lg={2} key={`filter-${filter.name}`}>
                  <ControlLabel>{filter.displayname}</ControlLabel>
                  <FormControl
                    type={filter.type}
                    name={filter.name}
                    defaultValue={defaultValue[filter.name]}
                    onChange={emailFilter}
                  />
                </Col>
              );
            case 'select':
              return (
                <Col lg={2} key={`filter-${filter.name}`}>
                  <ControlLabel>{filter.displayname}</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    name={filter.name}
                    defaultValue={defaultValue[filter.name]}
                    onChange={statusFilter}
                  >
                    <option value={null} />

                    {filter.value !== undefined
                      ? filter.value.map(filterName => (
                          <option
                            key={`select-${filterName}`}
                            value={filterName}
                          >
                            {filterName}
                          </option>
                        ))
                      : null
                    // from api data filters
                    }
                  </FormControl>
                </Col>
              );
            default:
              return null;
          }
        })}
      </Row>
    );
  }
}

export default withStyles(s)(Filters);
