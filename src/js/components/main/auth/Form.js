import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './form-style.scss';
import {
  initialAdviser,
  changeLogin,
  changePass,
  setEditStatus
} from './../../../ducks/Auth';
import auth from './utils';

class Form extends React.Component {
  static propTypes = {
    changeLogin: PropTypes.func.isRequired,
    changePass: PropTypes.func.isRequired,
    setEditStatus: PropTypes.func.isRequired,
    initialAdviser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string,
      pass: PropTypes.string
    })
  };
  static defaultProps = {
    user: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isSignInError: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleChangeLogin = e => {
    this.props.changeLogin(e.target.value);
  };

  handleChangePass = e => {
    this.props.changePass(e.target.value);
  };

  isSignInError = value => {
    this.setState({
      isSignInError: value
    });
  };

  handleSignIn() {
    const login = this.props.user.login.match(/[0-9a-zA-Z]{5,}/g);
    /* eslint-disable function-paren-newline */
    const pass = this.props.user.pass.match(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
    );

    if (login[0] && pass[0]) {
      auth(
        login[0],
        pass[0],
        this.isSignInError,
        this.props.history,
        this.props.initialAdviser,
        this.props.setEditStatus
      );
    }
  }

  render() {
    return (
      <div className={s.auth}>
        <form className={s.auth_form} method="post" action="/">
          <div className={s.auth_head}>
            <h2>Sign in</h2>
            <span>Please, fill in the following fields:</span>
          </div>
          {!this.state.isSignInError ? null : (
            <div className={s.form_errors}>
              User login or/and password is incorrect
            </div>
          )}
          <FormGroup controlId="login" bsSize="small">
            <ControlLabel>Login</ControlLabel>
            <FormControl
              autoFocus
              name="login"
              value={this.props.user.login}
              onChange={this.handleChangeLogin}
              type="text"
              placeholder="Input login"
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="small">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              name="password"
              value={this.props.user.pass}
              onChange={this.handleChangePass}
              type="password"
              placeholder="Input password"
            />
          </FormGroup>
          <Button
            block
            bsSize="small"
            bsStyle="primary"
            onClick={this.handleSignIn}
          >
            Enter
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer
});

export default connect(mapStateToProps, {
  initialAdviser,
  changeLogin,
  changePass,
  setEditStatus
})(withStyles(s)(Form));
