// Dependencies
import React, { useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import SellCollectibleTemplate from '@templates/projects/SellCollectible';
import NotFound from '@templates/404';

// API
import createApolloClient from '../../../../../apollo.client';

function PutOnSaleNFT({ nft }) {
  const [putOnSaleNFT] = useMutation(PUT_ON_SALE_NFT);

  const metadata = useMemo(() => {
    if (nft) {
      return JSON.parse(nft.metadata);
    }
    return null;
  }, [nft]);

  if (!nft) {
    return (
      <NotFound />
    );
  }

  return (
    <SellCollectibleTemplate
      title={`Put on sale: ${metadata.name} - ${nft.project.title}`}
      collectible={nft}
      putOnSaleNFT={putOnSaleNFT}
    />
  );
}

const GET_COLLECTIBLE = gql`
  query GetNFT($projectId: ID!, $nftId: Int!) {
    nft(projectId: $projectId, nftId: $nftId) {
      nftId
      metadata
      acquired

      project {
        id
        title
        collectionAddress
      }
    }
  }
`;

const PUT_ON_SALE_NFT = gql`
  mutation PutOnSaleNFT(
    $nftId: Int!
    $projectId: ID!
    $offer: OfferInput!
    $signature: UserSignatureInput!
  ) {
    putOnSaleNFT(
      nftId: $nftId
      projectId: $projectId
      offer: $offer
      signature: $signature
    ) {
      id
      quantity
      price
      isBundlePack
      currency

      user {
        address
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId, nftId } }) {
  const client = createApolloClient();
  const { data: { nft } } = await client.query({
    query: GET_COLLECTIBLE,
    variables: {
      projectId,
      nftId: Number(nftId)
    }
  });

  return {
    props: {
      nft
    }
  };
}

export default PutOnSaleNFT;
