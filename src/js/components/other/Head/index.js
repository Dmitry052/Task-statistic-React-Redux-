import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import s from './Head.scss';

type Props = {
  brandName: string,
  brendHref: string,
  children: any,
  logoutHref: string,
  inverse: boolean
};

class Head extends React.Component<Props> {
  render() {
    const { brandName, brendHref, logoutHref, children, inverse } = this.props;

    return (
      <Navbar inverse={inverse}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={brendHref}>{brandName}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav />
        {children}
        <Nav pullRight>
          <NavItem eventKey={3} href={logoutHref}>
            <i
              className="fa fa-sign-out fa-lg"
              aria-hidden="true"
              onClick={() => window.sessionStorage.clear()}
            />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withStyles(s)(Head);
