/* eslint-disable function-paren-newline */
/* flow */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ContentTable from './../../../other/ContentTable';
import config from './config.json';

type Props = {};

class Projects extends React.Component<Props> {
  componentWillMount = () => {};

  render() {
    const { sheets } = config;

    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <Tabs defaultActiveKey={1} id="table">
                {sheets.map((sheet, i) => (
                  <Tab
                    key={`sheet-${sheet.displayName}`}
                    eventKey={i + 1}
                    title={
                      sheet.displayName === undefined
                        ? sheet.name
                        : sheet.displayName
                    }
                  >
                    <ContentTable configSheet={sheet} />
                  </Tab>
                ))}
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state.table
});

export default connect(mapStateToProps, {})(Projects);
