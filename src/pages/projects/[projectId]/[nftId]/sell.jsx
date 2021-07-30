// Dependencies
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

// Templates
import SellCollectibleTemplate from '@templates/projects/SellCollectible';
import NotFound from '@templates/404';

// API
import { GET_COLLECTIBLE_TO_SELL } from '@api/project';
import { SELL_NFT } from '@api/collectible';

function Sell({ projectId, nftId }) {
  // Project Data
  const { data: { nft } = {}, loading } = useQuery(GET_COLLECTIBLE_TO_SELL, {
    variables: {
      projectId,
      nftId
    }
  });
  const [sellNFT] = useMutation(SELL_NFT);

  const metadata = useMemo(() => {
    if (nft) {
      return JSON.parse(nft.metadata);
    }
    return null;
  }, [nft]);

  if (loading) {
    return null;
  }

  if (!nft) {
    return (
      <NotFound />
    );
  }

  return (
    <SellCollectibleTemplate
      title={`Sell ${metadata.name} - Blizzt.io`}
      collectible={nft}
      sellNFT={sellNFT}
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
export default Sell;
