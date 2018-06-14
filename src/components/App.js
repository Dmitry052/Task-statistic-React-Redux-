import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  context: any,
  children: Node
};

class App extends React.Component<Props> {
  static childContextTypes = {
    insertCss: PropTypes.func
  };

  // getChildContext() {
  //   return { ...this.props.context };
  // }

  getChildContext(): void {
    return this.props.context;
  }

  render(): Node {
    // const { children, ...props } = this.props;
    // return React.cloneElement(children, props);
    return React.Children.only(this.props.children);
  }
}

export default App;
