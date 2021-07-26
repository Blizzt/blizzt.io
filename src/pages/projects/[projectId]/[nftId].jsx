// Dependencies
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Templates
import CollectibleDetailsTemplate from '@templates/projects/CollectibleDetails';
import NotFound from '@templates/404';

// API
import { GET_COLLECTIBLE } from '@api/project';
import IPFSFetch from '@components/utils/IPFSFetch';

function CollectibleDetails({ projectId, nftId }) {
  // Project Data
  const { data: { nft } = {}, loading } = useQuery(GET_COLLECTIBLE, {
    variables: {
      projectId,
      nftId
    }
  });

  if (loading) {
    return null;
  }

  if (!nft) {
    return (
      <NotFound />
    );
  }

  return (
    <IPFSFetch
      endpoint={nft.IPFSAddress}
      metadata={nft.metadata}
      onRender={({ data }) => (
        <CollectibleDetailsTemplate
          project={nft.project}
          collectible={{
            ...data,
            ...nft
          }}
          title={`${nft.project.title} - Blizzt.io`}
        />
      )}
    />
  );
}

export async function getServerSideProps({ params: { projectId, nftId } }) {
  return {
    props: {
      projectId,
      nftId: parseInt(nftId, 0)
    }
  };
}
export default CollectibleDetails;
