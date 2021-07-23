// Dependencies
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Containers
import MarkdownViewContainer from '@containers/MarkdownViewContainer';

// API
import { GET_PROJECT_DETAILS } from '@api/project';

function ProjectDetails() {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

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
    <ProjectDetailsTemplate project={project}>
      <MarkdownViewContainer document={project.document} />
    </ProjectDetailsTemplate>
  );
}

export default ProjectDetails;
