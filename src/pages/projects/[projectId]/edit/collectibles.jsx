// Dependencies
import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useQuery } from '@apollo/react-hooks';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import RewardsEditContainer, { modeTypesId } from '@containers/RewardsEditContainer';

// API
import CollectibleAPI from '@api/collectible';
import { GET_PROJECT_COLLECTIBLES } from '@api/project';

// Hooks
import { useTheme } from '@styled-components/index';

// Types
import { modalTypesId } from '@types/ui';

function EditMyProjectCollectibles({ projectId }) {
  const { openModal, closeModal } = useTheme();
  const { chainId, account } = useWeb3React();

  // Project Data
  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_COLLECTIBLES, {
    variables: {
      id: projectId
    }
  });

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

  if (loading) {
    return null;
  }

  return (
    <EditMyProjectTemplate
      project={project}
      title={`${project.title} - Edit collectibles`}
    >
      <SectionTitle
        title={'Add the NFTs that will help you raise funds.'}
        description={'Offer simple, meaningful ways to bring backers closer to your project and celebrate it coming to life.'}>
        <RewardsEditContainer
          project={project}
          collectibles={project.nfts}
          handleNFTCreationSubmit={handleNFTCreationSubmit}
        />
      </SectionTitle>
    </EditMyProjectTemplate>
  );
}

export async function getServerSideProps({ params: { projectId } }) {
  return {
    props: {
      projectId
    }
  };
}

export default EditMyProjectCollectibles;
