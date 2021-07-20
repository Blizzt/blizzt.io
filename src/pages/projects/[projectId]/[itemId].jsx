// Dependencies
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Templates
import CollectibleDetailsTemplate from '@templates/projects/CollectibleDetails';
import NotFound from '@templates/404';

// API
import ProjectAPI from '@api/project';

function CollectibleDetails({ collectible, ...props }) {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = null } = useSWR(`/projects/${projectId}`, { initialData: props.project });

  if (!collectible) {
    return (
      <NotFound />
    );
  }

  return (
    <CollectibleDetailsTemplate
      project={project}
      collectible={collectible}
      title={`${collectible.name} - Blizzt.io`}
    />
  );
}

export async function getServerSideProps({ params: { projectId, itemId } }) {
  const { data: project } = await ProjectAPI.getById(projectId);
  const { data: collectible } = await ProjectAPI.getCollectibleById(project.nftCollectionAddress, itemId);

  return {
    props: {
      project,
      collectible
    }
  };
}

export default CollectibleDetails;
