// Dependencies
import React from 'react';
import gql from 'graphql-tag';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// API
import createApolloClient from '../../../../apollo.client';

function ProjectDetailsCollectibles({ project }) {
  return (
    <ProjectDetailsTemplate
      project={project}
      title={`${project.name} - Details`}
    >
      Details
    </ProjectDetailsTemplate>
  );
}

export const GET_PROJECT_DETAILS = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      chainId
      description
      isPublic
      photoUrl
      createdAt

      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId } }) {
  const client = createApolloClient();
  const { data: { project } } = await client.query({
    query: GET_PROJECT_DETAILS,
    variables: {
      projectId
    }
  });

  return {
    props: {
      project
    }
  };
}

export default ProjectDetailsCollectibles;
