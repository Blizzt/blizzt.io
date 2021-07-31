// Dependencies
import React, { useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import RentCollectibleTemplate from '@templates/projects/RentCollectible';
import NotFound from '@templates/404';

// API
import { withApollo } from '@api/apollo';
import createApolloClient from '../../../../../apollo.client';

function PutOnRentNFT({ nft }) {
  const [putOnRentNFT] = useMutation(PUT_ON_RENT_NFT);

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
    <RentCollectibleTemplate
      title={`Put on rent: ${metadata.name} - ${nft.project.title}`}
      collectible={nft}
      putOnRentNFT={putOnRentNFT}
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

const PUT_ON_RENT_NFT = gql`
  mutation PutOnRentNFT(
    $nftId: Int!
    $projectId: ID!
    $offer: OfferInput!
    $signature: UserSignatureInput!
  ) {
    putOnRentNFT(
      nftId: $nftId
      projectId: $projectId
      offer: $offer
      signature: $signature
    ) {
      id
      quantity
      price
      maxExpirationDate
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

export default PutOnRentNFT;
