/* @flow */
import React from 'react';
import { Row, Col, FormControl, ControlLabel } from 'react-bootstrap';

type Props = {
  column: string,
  dataListColumn: Array<mixed>,
  config: {
    value: string,
    displayName: string,
    sourceData: mixed
  },
  dataList: Array<mixed>,
  onChange: () => void
};

class Period extends React.Component<Props> {
  render() {
    const { dataList, onChange, column, dataListColumn } = this.props;
    const { value, displayName, sourceData } = this.props.config;
    const valueSelect = new Set();
    const uniqueValue = [];
    let localSelect = '';

    if (dataListColumn !== undefined) {
      // search unique value
      dataListColumn.forEach(item => {
        valueSelect.add(item[column]);
      });

      // create array whith unique value
      valueSelect.forEach(item => uniqueValue.push({ [column]: item }));

      localSelect = (
        <FormControl
          componentClass="select"
          check={value}
          local="true"
          onChange={onChange}
        >
          <option value="" />
          {uniqueValue.map(item => (
            <option
              key={`select-lang-${item[column]}`}
              readOnly
              value={item[column]}
            >
              {item[column]}
            </option>
          ))}
        </FormControl>
      );
    }

    return (
      <Col lg={3}>
        <Row>
          <Col lg={12} md={12} xs={12}>
            <ControlLabel>Select</ControlLabel>
            {sourceData.url !== undefined ? (
              <FormControl
                componentClass="select"
                check={value}
                local="false"
                onChange={onChange}
              >
                <option value="" />
                {dataList.map(item => (
                  <option
                    key={`select-lang-${item[value]}`}
                    readOnly
                    value={item[value]}
                  >
                    {item[displayName]}
                  </option>
                ))}
              </FormControl>
            ) : (
              localSelect
            )}
          </Col>
        </Row>
      </Col>
    );
  }
}
export default Period;
