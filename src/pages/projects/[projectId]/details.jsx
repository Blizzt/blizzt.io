// Dependencies
import React from 'react';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Components
import { useQuery } from '@apollo/react-hooks';

// API
import { GET_PROJECT_DETAILS } from '@api/project';

function ProjectDetailsCollectibles({ projectId }) {
  // Project Data
  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_DETAILS, {
    variables: {
      id: projectId
    }
  });

  if (loading) {
    return null;
  }

  return (
    <ProjectDetailsTemplate
      project={project}
      title={`${project.name} - Details`}
    >
      Details
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

export default ProjectDetailsCollectibles;
