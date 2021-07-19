// Dependencies
import React, { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import RewardsEditContainer, { modeTypesId } from '@containers/RewardsEditContainer';

// API
import ProjectAPI from '@api/project';
import CollectibleAPI from '@api/collectible';

// Hooks
import { useTheme } from '@styled-components/index';
import { modalTypesId } from '@types/ui';

function EditMyProjectCollectibles(props) {
  // Hooks
  const { openModal, closeModal } = useTheme();
  const router = useRouter();
  const { projectId } = router.query;
  const { chainId, account } = useWeb3React();

  // Project Data
  const { data: project = null } = useSWR(`/projects/${projectId}`, { initialData: props.project });
  const { data: collectibles } = useSWR(null, ProjectAPI.getCollectibles(project.nftCollectionAddress));

  const handleNFTCreationSubmit = useCallback(async(collectible, formikHelpers, actionButtonRef, setMode) => {
    await openModal(modalTypesId.CREATE_MY_COLLECTIBLE_PROCESS);
    await CollectibleAPI.create({
      chainId,
      projectId,
      collectible
    });
    await closeModal();
    await setMode(modeTypesId.VIEWING_MODE);
  }, [chainId, account, projectId]);

  if (!project) {
    return null;
  }

  return (
    <EditMyProjectTemplate
      project={project}
      title={`${project.name} - Edit collectibles`}
    >
      <SectionTitle
        title={'Add the NFTs that will help you raise funds.'}
        description={'Offer simple, meaningful ways to bring backers closer to your project and celebrate it coming to life.'}>
        <RewardsEditContainer
          project={project}
          collectibles={collectibles}
          handleNFTCreationSubmit={handleNFTCreationSubmit}
        />
      </SectionTitle>
    </EditMyProjectTemplate>
  );
}

export async function getServerSideProps({ params: { projectId } }) {
  const { data: project } = await ProjectAPI.getById(projectId);

  return {
    props: {
      project
    }
  };
}

export default EditMyProjectCollectibles;
