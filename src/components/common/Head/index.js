/* @flow */
import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Head.scss';

type Props = {
  brandName: string,
  brendHref: string,
  children: any,
  logoutHref: string,
  user: string
};

export const Head = (props: Props): React.Node => {
  const { brandName, brendHref, logoutHref, children, user } = props;

  return (
    <div className={s.mainHead}>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-white" href={brendHref}>
          {brandName}
        </a>
        <button
          className={cx(["navbar-toggler", s.btnToggle])}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto mt-2 mt-lg-0">{children}</div>

          <a href={logoutHref}>
            <i
              className="fa fa-sign-out fa-lg"
              aria-hidden="true"
              onClick={(): void => window.sessionStorage.clear()}
            />
            {` ${user}`}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default withStyles(s)(Head);
