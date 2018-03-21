import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Row, Col, FormControl, Form } from 'react-bootstrap';
import s from './expand.scss';
import Foto from './../foto';
import BtnControl from './btnControl';
import ModalDecline from './modalDecline';

type Props = {
  contentRow: any
};

class Head extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount = () => {
    const { contentRow } = this.props;
    this.initialState(contentRow);
  };

  initialState = ({ validateInf, doc }) => {
    // for text field
    validateInf.forEach(item => {
      this.setState({
        [item.field]: true,
        [`${item.field}-value`]: item.value,
        [`${item.field}-comment`]: '',
        [`${item.field}-validationState`]: null,
        [`${item.field}-check`]: null,
        [`${item.field}-text`]: false,
        [`${item.field}-disable`]: false
      });
    });
    // for image
    doc.forEach(item => {
      this.setState({
        [`img-${item.id}-check`]: null,
        [`img-${item.id}-checkComment`]: false,
        [`img-${item.id}-comment`]: '',
        [`img-${item.id}-validationState`]: null
      });
    });
  };

  handleLock = e => {
    const field = e.target.getAttribute('value');
    this.setState({
      [field]: !this.state[field]
    });
  };

  handleConfirm = e => {
    const field = e.target.getAttribute('value');
    this.setState({
      [`${field}-check`]: true
    });
  };

  handleDecline = e => {
    const field = e.target.getAttribute('value');
    this.setState({
      [`${field}-text`]: !this.state[`${field}-text`],
      [`${field}-disable`]: !this.state[`${field}-disable`]
    });
  };

  handleAccept = e => {
    const field = e.target.getAttribute('value');

    if (this.state[`${field}-comment`].length >= 10) {
      this.handleDecline(e);
      this.setState({
        [`${field}-check`]: false,
        [`${field}-validationState`]: null
      });
    } else {
      this.setState({
        [`${field}-validationState`]: 'error'
      });
    }
  };

  handleCancelAccept = e => {
    const field = e.target.getAttribute('value');
    this.setState({
      [`${field}-text`]: !this.state[`${field}-text`],
      [`${field}-disable`]: !this.state[`${field}-disable`],
      [`${field}-validationState`]: null
    });
  };

  handleCheckImg = imgId => this.setState({ [`img-${imgId}-check`]: true });

  handleUnCheckImg = imgId =>
    this.setState({
      [`img-${imgId}-check`]: false,
      [`img-${imgId}-checkComment`]: true
    });

  handleAcceptImg = imgId => {
    if (this.state[`img-${imgId}-comment`].length >= 10) {
      this.setState({
        [`img-${imgId}-check`]: false,
        [`img-${imgId}-checkComment`]: false
      });
    } else {
      this.setState({
        [`img-${imgId}-validationState`]: 'error'
      });
    }
  };

  handleCancelImg = imgId => {
    this.setState({
      [`img-${imgId}-check`]: null,
      [`img-${imgId}-checkComment`]: false,
      [`img-${imgId}-validationState`]: null
    });
  };

  // combine functions
  handleField = e => {
    const { value } = e.target;
    const field = e.target.getAttribute('field');

    this.setState({
      [`${field}-value`]: value
    });
  };

  // handle comment feilds expand component
  handleComment = e => {
    const { value } = e.target;
    const field = e.target.getAttribute('field');

    if (
      this.state[`${field}-validationState`] === 'error' &&
      value.length >= 10
    ) {
      this.setState({
        [`${field}-validationState`]: null
      });
    }

    this.setState({
      [`${field}-comment`]: value
    });
  };

  handleImgComment = e => {
    const { value } = e.target;
    const id = e.target.getAttribute('idimg');

    if (
      this.state[`img-${id}-validationState`] === 'error' &&
      value.length >= 10
    ) {
      this.setState({
        [`img-${id}-validationState`]: null
      });
    }

    this.setState({
      [`img-${id}-comment`]: value
    });
  };

  resetState = () => {
    const { contentRow } = this.props;
    this.initialState(contentRow);
  };

  renderTrueFalseIcon = status => {
    switch (status) {
      case true:
        return (
          <div className={s.checkField}>
            <i className="fa fa-check fa-2x" aria-hidden="true" />
          </div>
        );
      case false:
        return (
          <div className={s.unCheckField}>
            <i className="fa fa-times fa-2x" aria-hidden="true" />
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { contentRow } = this.props;
    const { validateInf, doc } = contentRow;

    return (
      <div className="static-modal">
        <Row>
          <Col lg={6} md={6} sm={6}>
            {validateInf.map(item => (
              <Row key={`${item.field}-contentRow.id`}>
                <Col lg={12}>
                  <Col lg={8}>
                    <Form horizontal>
                      <Col lg={3}>{item.field}</Col>
                      <Col lg={9}>
                        <FormControl
                          className={s.textPart}
                          type="text"
                          field={item.field}
                          value={this.state[`${item.field}-value`]}
                          onChange={this.handleField}
                          readOnly={this.state[item.field]}
                        />
                      </Col>
                    </Form>
                  </Col>
                  <Col lg={4} className={s.btnControl}>
                    {/* eslint-disable function-paren-newline */
                    this.renderTrueFalseIcon(this.state[`${item.field}-check`])}

                    {/* default */}
                    {this.state[`${item.field}-check`] === null ? (
                      <BtnControl
                        fieldDisable={this.state[`${item.field}-disable`]}
                        field={item.field}
                        handleConfirm={this.handleConfirm}
                        handleDecline={this.handleDecline}
                        handleLock={this.handleLock}
                        stateField={this.state[item.field]}
                      />
                    ) : null}
                  </Col>
                  <Col lg={12}>
                    {this.state[`${item.field}-text`] ? (
                      <ModalDecline
                        field={item.field}
                        fieldText={this.state[`${item.field}-text`]}
                        fieldValidationState={
                          this.state[`${item.field}-validationState`]
                        }
                        fieldComment={this.state[`${item.field}-comment`]}
                        handleComment={this.handleComment}
                        handleAccept={this.handleAccept}
                        handleCancelAccept={this.handleCancelAccept}
                      />
                    ) : null}
                  </Col>
                </Col>
              </Row>
            ))}
          </Col>
          <Col lg={6} md={6} sm={6} className={s.containerFoto}>
            {doc.map(item => (
              <Foto
                key={`scan-${item.id}`}
                imgId={item.id}
                foto={item}
                state={this.state[`img-${item.id}-check`]}
                checkComment={this.state[`img-${item.id}-checkComment`]}
                handleCheckImg={this.handleCheckImg}
                handleUnCheckImg={this.handleUnCheckImg}
                handleAcceptImg={this.handleAcceptImg}
                handleCancelImg={this.handleCancelImg}
                commentValue={this.state[`img-${item.id}-comment`]}
                validationState={this.state[`img-${item.id}-validationState`]}
                handleImgComment={this.handleImgComment}
              />
            ))}
          </Col>
          <Col lg={12}>
            <div className={s.btn}>
              <Button onClick={this.resetState}>Reset All</Button>
              <Button bsStyle="primary">Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Head);
