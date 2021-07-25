// Dependencies
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import MainTemplate from '@templates/MainTemplate';

// GraphQL
import { withApollo } from '@api/apollo';

export const LATEST_PROJECTS = gql`
  query {
    projects(order: DESC) {
      id
      title
      photoUrl
      
      category {
        id
        name
      }
    }
  }
`;

function Main() {
  const { loading, data: { projects: latestProjects } = {} } = useQuery(LATEST_PROJECTS);

  if (loading) {
    return null;
  }

  return (
    <MainTemplate
      title={'Blizzt.io | Blockchain Technology for Developers and Gamers'}
      latestProjects={latestProjects}
    />
  );
}

export default withApollo({ ssr: true })(Main);
