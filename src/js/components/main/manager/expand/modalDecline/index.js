import React, { Component } from 'react';
import Modal from 'react-modal';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../expand.scss';

const customModalStyles = {
  overlay: {},
  content: {
    width: '400px',
    height: '200px',
    top: '230px',
    margin: '0 auto'
  }
};

type Props = {
  field: boolean,
  fieldText: boolean,
  fieldValidationState: any,
  fieldComment: string,
  handleComment: (str: string) => void,
  handleAccept: (str: string) => void,
  handleCancelAccept: (str: string) => void
};

class ModalDecline extends Component<Props> {
  render() {
    const {
      field,
      fieldText,
      fieldValidationState,
      fieldComment,
      handleComment,
      handleAccept,
      handleCancelAccept
    } = this.props;
    return (
      <Modal isOpen={fieldText} ariaHideApp={false} style={customModalStyles}>
        <div className={s.declineStyle}>
          {fieldValidationState === 'error' ? (
            <h4>
              {field}
              <span className={s.errorSizeComment}>Very shot comment</span>
            </h4>
          ) : (
            <h4>{field}</h4>
          )}
          <FormGroup validationState={fieldValidationState}>
            <FormControl
              componentClass="textarea"
              field={field}
              value={fieldComment}
              placeholder="Decline comment"
              onChange={handleComment}
              rows={4}
              cols={8}
            />
            <Button bsStyle="warning" value={field} onClick={handleAccept}>
              Accept
            </Button>
            <Button
              bsStyle="default"
              value={field}
              onClick={handleCancelAccept}
            >
              Cancel
            </Button>
          </FormGroup>
        </div>
      </Modal>
    );
  }
}

export default withStyles(s)(ModalDecline);
