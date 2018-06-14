import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './form-style.scss';
import {
  initialAdviser,
  changeLogin,
  changePass,
  changeSSR,
  changePayformUrl,
  setEditStatus
} from './../../../ducks/Auth';
import auth from './utils';

type Props = {
  history: () => void,
  changeLogin: (e: SyntheticEvent) => void,
  changePass: (e: SyntheticEvent) => void,
  changeSSR: (ssr: boolean) => void,
  changePayformUrl: (url: string) => void,
  setEditStatus: () => void,
  initialAdviser: () => void,
  user: Object
};

type State = {
  isSignInError: boolean
};

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSignInError: false
    };
  }

  setOptions = (ssr: boolean, url: string) => {
    this.props.changeSSR(ssr);
    this.props.changePayformUrl(url);
  };

  handleChangePass = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.target) {
      this.props.changePass(e.target.value);
    }
  };

  handleChangeLogin = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.target) {
      this.props.changeLogin(e.target.value);
    }
  };

  isSignInError = (value: boolean) => {
    if (value) {
      this.setState({
        isSignInError: value
      });
    }
  };

  handleSignIn = () => {
    const login: Array<string> = this.props.user.login.match(
      /[0-9a-zA-Z]{5,}/g
    );
    const pass: Array<string> = this.props.user.pass.match(
      /[0-9a-zA-Z!@#$%^&*]{6,}/g
    );

    if (login && pass) {
      auth(
        login[0],
        pass[0],
        this.isSignInError,
        this.setOptions,
        this.props.history,
        this.props.initialAdviser,
        this.props.setEditStatus
      );
    } else {
      this.setState({
        isSignInError: true
      });
    }
  };

  handleSubmit = (e: Object) => {
    e.preventDefault();
    this.handleSignIn();
  };

  render(): React.Node {
    const signIn = this.handleSignIn;
    window.document.onkeydown = function handleEvent(event: Object) {
      if (event.code === 'Enter') {
        signIn();
      }
    };

    return (
      <div className={s.bodyBackgound}>
        <div className={s.container}>
          <div className={s.auth}>
            <form
              className={s.auth_form}
              method="post"
              action="/"
              onSubmit={this.handleSubmit}
            >
              <div className={s.auth_head}>
                <h2>Sign in</h2>
                <span>Please, fill in the following fields:</span>
              </div>
              {!this.state.isSignInError ? null : (
                <div className={s.form_errors}>
                  User login or/and password is incorrect
                </div>
              )}

              <div className={s.inputElem}>
                <div className={cx(['form-group'])}>
                  <label htmlFor="inputLogin">
                    <span>Login</span>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLogin"
                      placeholder="Enter login"
                      value={this.props.user.login}
                      onChange={this.handleChangeLogin}
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="inputPass">
                    <span>Password</span>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPass"
                      placeholder="Enter password"
                      value={this.props.user.pass}
                      onChange={this.handleChangePass}
                    />
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  user: state.authReducer
});

export default connect(
  mapStateToProps,
  {
    initialAdviser,
    changeLogin,
    changePass,
    changeSSR,
    changePayformUrl,
    setEditStatus
  }
)(withStyles(s)(Form));
