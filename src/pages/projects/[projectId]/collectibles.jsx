// Dependencies
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Components
import RewardsList from '@components/lists/RewardsList';

function ProjectDetailsCollectibles() {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = {} } = useSWR(`/projects/${projectId}`);

  /**
   * @function onClickCollectible():
   * @description Function that is triggered by pressing edit collectible.
   */
  const onClickCollectible = useCallback((item) => {
    router.push(`/projects/${projectId}/collectibles/${item.id}`);
  }, []);

  return (
    <ProjectDetailsTemplate
      project={project}
      title={`${project.name} - Collectibles`}
    >
      <RewardsList
        collectibles={project.collectibles}
        onClick={onClickCollectible}
      />
    </ProjectDetailsTemplate>
  );
}

export default ProjectDetailsCollectibles;
