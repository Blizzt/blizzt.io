// Dependencies
import React from 'react';
import gql from 'graphql-tag';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Containers
import MarkdownViewContainer from '@containers/MarkdownViewContainer';

// API
import createApolloClient from '../../../../apollo.client';

function ProjectDetails({ project }) {
  return (
    <ProjectDetailsTemplate project={project}>
      <MarkdownViewContainer document={project.document} />
    </ProjectDetailsTemplate>
  );
}

export const GET_PROJECT_PAPER = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      title
      description
      photoUrl
      document
      
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
    query: GET_PROJECT_PAPER,
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

export default ProjectDetails;
