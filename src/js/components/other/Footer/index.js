import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import s from './Footer.scss';

type Props = {
  resultFields: mixed,
  styleFooter: mixed
};

class Footer extends React.Component<Props> {
  render() {
    const { resultFields, styleFooter } = this.props;
    const countField = Object.keys(resultFields);
    const sizeCol = 12 / countField.length;

    return (
      <Row className={s.footer}>
        {countField.map(item => (
          <Col
            key={`total-${item}`}
            className={cx(s.cell, styleFooter[item])}
            lg={sizeCol}
            md={sizeCol}
            sm={sizeCol}
            xs={sizeCol}
          >
            {resultFields[item]}
          </Col>
        ))}
      </Row>
    );
  }
}

export default withStyles(s)(Footer);
