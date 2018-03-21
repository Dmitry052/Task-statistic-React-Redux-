import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Image, Button, FormControl, FormGroup } from 'react-bootstrap';
import Modal from 'react-modal';
import s from './foto.scss';

const modalStyles = {
  overlay: {
    backgroundColor: 'none'
  },
  content: {
    width: '50%',
    transform: 'translateX(95%)'
  }
};

const modalCommentStyles = {
  overlay: {},
  content: {
    width: '400px',
    height: '200px',
    top: '230px',
    margin: '0 auto'
  }
};

type Props = {
  foto: any,
  imgId: any,
  state: boolean,
  commentValue: string,
  checkComment: boolean,
  validationState: any,
  handleCheckImg: (id: number) => void,
  handleUnCheckImg: (id: number) => void,
  handleAcceptImg: (id: number) => void,
  handleCancelImg: (id: number) => void,
  handleImgComment: (id: number) => void
};

class Head extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  handleCheck = e => {
    const id = e.target.getAttribute('id');
    this.props.handleCheckImg(Number(id));
  };

  handleUnCheck = e => {
    const id = e.target.getAttribute('id');
    this.props.handleUnCheckImg(Number(id));
  };

  handleAccept = e => {
    const id = e.target.getAttribute('id');
    this.props.handleAcceptImg(Number(id));
  };
  handleCancel = e => {
    const id = e.target.getAttribute('id');
    this.props.handleCancelImg(Number(id));
  };

  handleOnOffZoom = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleZoom = () => {
    const { showModal } = this.state;
    const { foto } = this.props;

    if (showModal) {
      return (
        <Modal isOpen ariaHideApp={false} style={modalStyles}>
          <div className={s.closeZoom}>
            <Button bsStyle="danger" onClick={this.handleOnOffZoom}>
              Close
            </Button>
          </div>
          <Image src={foto.urlImg} responsive />
        </Modal>
      );
    }
    return null;
  };

  render() {
    const {
      foto,
      state,
      imgId,
      checkComment,
      handleImgComment,
      commentValue,
      validationState
    } = this.props;

    return (
      <div>
        <div className={s.card}>
          <Image src={foto.urlImg} responsive />

          {state === true ? (
            <div className={s.checkTrueStyle}>
              <i className="fa fa-check fa-3x" aria-hidden="true" />
            </div>
          ) : null}

          {state === false ? (
            <div className={s.uncheckTrueStyle}>
              <i className="fa fa-times fa-3x" aria-hidden="true" />
            </div>
          ) : null}

          {state === null ? (
            <div className={s.zoomStyle}>
              <i
                className="fa fa-search-plus fa-2x"
                aria-hidden="true"
                onClick={this.handleOnOffZoom}
              />
            </div>
          ) : null}

          {state === null ? (
            <div className={s.accessBtn}>
              <Button id={imgId} bsStyle="success" onClick={this.handleCheck}>
                <i
                  id={imgId}
                  className="fa fa-check fa-1x"
                  aria-hidden="true"
                />
              </Button>

              <Button id={imgId} bsStyle="danger" onClick={this.handleUnCheck}>
                <i
                  id={imgId}
                  className="fa fa-times fa-1x"
                  aria-hidden="true"
                />
              </Button>
            </div>
          ) : null}

          {this.handleZoom()}
        </div>

        {checkComment ? (
          <Modal
            isOpen={checkComment}
            style={modalCommentStyles}
            ariaHideApp={false}
          >
            <div className={s.declineStyle}>
              {validationState === 'error' ? (
                <h4>
                  Name document
                  <span className={s.errorSizeComment}>Very shot comment</span>
                </h4>
              ) : (
                <h4>Name document</h4>
              )}
              <FormGroup validationState={validationState}>
                <FormControl
                  componentClass="textarea"
                  idimg={imgId}
                  placeholder="Decline comment"
                  value={commentValue}
                  onChange={handleImgComment}
                  rows={4}
                />
                <Button
                  id={imgId}
                  bsStyle="warning"
                  onClick={this.handleAccept}
                >
                  Access
                </Button>
                <Button
                  id={imgId}
                  bsStyle="default"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </FormGroup>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default withStyles(s)(Head);
