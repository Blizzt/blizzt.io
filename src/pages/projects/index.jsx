// Dependencies
import React from 'react';
import gql from 'graphql-tag';

// Templates
import ProjectsTemplate from '@templates/projects/Projects';

// API
import createApolloClient from '../../../apollo.client';

function Projects({ projects }) {
  return (
    <ProjectsTemplate projects={projects} />
  );
}

export const LATEST_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      photoUrl
      nftsCount
      description

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

export default Projects;
