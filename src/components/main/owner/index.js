// @flow
import React, { Fragment } from 'react';
import type { Node } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Header from './../../common/Head';
import Error from './../../common/error';
import Table from './Table';
import s from './owner.scss';

type Props = {
  history: Object,
  user: ?string,
  payform_url: ?string,
  query: Object,
  role: string
};

type State = {
  error: boolean
};

class Owner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: false
    };
  }

  componentDidCatch(error: boolean, errorInfo: string) {
    if (error) {
      this.setState({ error });
      window.Raven.captureException(error, { extra: errorInfo });
    }
  }

  render(): Node {
    const user = this.props.user
      ? this.props.user
      : window.localStorage.getItem('user');

    const trigerSSR = (this.props.user && this.props.payform_url) || false;

    return (
      <Fragment>
        <Header
          brandName="Template table"
          user={user}
          brendHref="/"
          logoutHref="/auth/logout"
        />

        {this.state.error === false ? (
          <Table
            trigerSSR={trigerSSR}
            history={this.props.history}
            query={this.props.query}
            role={this.props.role}
          />
        ) : (
          <Error />
        )}
      </Fragment>
    );
  }
}

export default withStyles(s)(Owner);
