import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../expand.scss';

type Props = {
  fieldDisable: boolean,
  field: boolean,
  handleConfirm: (e: string) => void,
  handleDecline: (e: string) => void,
  handleLock: (e: string) => void,
  stateField: boolean
};

class BtnControl extends Component<Props> {
  render() {
    const {
      fieldDisable,
      field,
      handleConfirm,
      handleDecline,
      handleLock,
      stateField
    } = this.props;
    return (
      <div>
        <Button
          disabled={fieldDisable}
          value={field}
          bsStyle="success"
          onClick={handleConfirm}
        >
          <i value={field} className="fa fa-check" aria-hidden="true" />
        </Button>

        <Button
          disabled={fieldDisable}
          value={field}
          bsStyle="danger"
          onClick={handleDecline}
        >
          <i value={field} className="fa fa-times" aria-hidden="true" />
        </Button>

        <Button disabled={fieldDisable} value={field} onClick={handleLock}>
          {stateField ? (
            <i value={field} className="fa fa-lock" aria-hidden="true" />
          ) : (
            <i value={field} className="fa fa-unlock" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(BtnControl);
