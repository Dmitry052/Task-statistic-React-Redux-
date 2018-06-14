import React from 'react';
import Owner from './../../../src/components/main/owner';

type Props = {
  user: string,
  payform_url: string,
  query: Object,
  history: Object,
  role: string
};
class Client extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    /* eslint-disable no-shadow */
  }
  render(): Node {
    return (
      <Owner
        user={this.props.user}
        history={this.props.history}
        payform_url={this.props.payform_url}
        query={this.props.query}
        role={this.props.role}
      />
    );
  }
}

export default Client;
