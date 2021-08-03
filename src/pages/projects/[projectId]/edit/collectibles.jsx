// Dependencies
import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import gql from 'graphql-tag';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import RewardsEditContainer, { modeTypesId } from '@containers/RewardsEditContainer';

// API
import createApolloClient from '../../../../../apollo.client';

// Hooks
import { useTheme } from '@styled-components/index';

// Types
import { modalTypesId } from '@types/ui';
import NFT from '@contracts/operations/NFT';

function EditMyProjectCollectibles({ project }) {
  const { openModal, closeModal } = useTheme();
  const { chainId, account } = useWeb3React();

  const handleNFTCreationSubmit = useCallback(async(collectible, formikHelpers, actionButtonRef, setMode) => {
    await openModal(modalTypesId.CREATE_MY_COLLECTIBLE_PROCESS);
    await NFT.mint(chainId, project.id, collectible);
    await closeModal();
    await setMode(modeTypesId.VIEWING_MODE);
  }, [chainId, account, project]);

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

export const GET_PROJECT_DETAILS = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      photoUrl
      createdAt

      nfts {
        IPFSAddress
        metadata
        mintedAmount
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId } }) {
  const client = createApolloClient();
  const { data: { project } } = await client.query({
    query: GET_PROJECT_DETAILS,
    variables: {
      id: projectId
    }
  });

  return {
    props: {
      project
    }
  };
}

export default EditMyProjectCollectibles;
