import React from 'react';
import Head from './../../other/Head';
import Table from './table';

class Partner extends React.Component {
  render() {
    return (
      <div>
        <Head
          brandName="Manager cabinet"
          brendHref="/"
          logoutHref="/auth/logout"
          inverse
        />
        <Table />
      </div>
    );
  }
}

export default Partner;
