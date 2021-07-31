// Dependencies
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import MainTemplate from '@templates/MainTemplate';

// GraphQL
import createApolloClient from '../../apollo.client';

function Main({ projects }) {
  return (
    <MainTemplate
      title={'Blizzt.io | Blockchain Technology for Developers and Gamers'}
      latestProjects={projects}
    />
  );
}

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

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data: { projects } } = await client.query({
    query: LATEST_PROJECTS
  });

  return {
    props: {
      projects
    }
  };
}

export default Main;
