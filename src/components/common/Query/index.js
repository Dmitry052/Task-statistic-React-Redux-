import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ExchangeRates = (): Query => (
  <Query
    query={gql`
      {
        books {
          title
          author
        }
      }
    `}
  >
    {({ loading, error, data }: Query): React$Element<string> => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.books.map(
        (book: Object): React$Element<string> => (
          <div>
            <p>{`${book.title}: ${book.author}`}</p>
          </div>
        )
      );
    }}
  </Query>
);

export default ExchangeRates;
