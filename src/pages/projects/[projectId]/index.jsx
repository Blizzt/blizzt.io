// Dependencies
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Containers
import MarkdownViewContainer from '@containers/MarkdownViewContainer';

// API
import { GET_PROJECT_PAPER } from '@api/project';

function ProjectDetails({ projectId }) {
  // Project Data
  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_PAPER, {
    variables: {
      id: projectId
    }
  });

  if (loading) {
    return null;
  }

  return (
    <ProjectDetailsTemplate project={project}>
      <MarkdownViewContainer document={project.document} />
    </ProjectDetailsTemplate>
  );
}

export async function getServerSideProps({ params: { projectId } }) {
  return {
    props: {
      projectId
    }
  };
}

export default ProjectDetails;
