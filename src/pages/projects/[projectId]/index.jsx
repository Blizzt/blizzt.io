// Dependencies
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Containers
import MarkdownViewContainer from '@containers/MarkdownViewContainer';

function ProjectDetails() {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = null } = useSWR(`/projects/${projectId}`);

  if (!project) {
    return null;
  }

  return (
    <ProjectDetailsTemplate project={project}>
      <MarkdownViewContainer document={project.document} />
    </ProjectDetailsTemplate>
  );
}

export default ProjectDetails;
