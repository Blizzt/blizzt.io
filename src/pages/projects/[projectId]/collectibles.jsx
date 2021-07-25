// Dependencies
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Components
import RewardsList from '@components/lists/RewardsList';

// API
import { GET_PROJECT_COLLECTIBLES } from '@api/project';

function ProjectDetailsCollectibles({ projectId }) {
  // Hooks
  const router = useRouter();

  // Project Data
  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_COLLECTIBLES, {
    variables: {
      id: projectId
    }
  });

  /**
   * @function onClickCollectible():
   * @description Function that is triggered by pressing edit collectible.
   */
  const onClickCollectible = useCallback((item) => {
    router.push(`/projects/${projectId}/${item.id}`);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ProjectDetailsTemplate
      project={project}
      title={`${project.name} - Collectibles`}
    >
      <RewardsList
        collectibles={project.nfts}
        onClick={onClickCollectible}
      />
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
