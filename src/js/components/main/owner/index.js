import React from 'react';
import Head from './../../other/Head';
import Table from './Table';

class Partner extends React.Component {
  render() {
    return (
      <div>
        <Head brandName="Owner cabinet" brendHref="/" logoutHref="/auth/logout" />
        <Table />
      </div>
    );
  }
}

export default Partner;
