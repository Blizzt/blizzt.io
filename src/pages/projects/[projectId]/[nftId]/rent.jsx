// Dependencies
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import RentCollectibleTemplate from '@templates/projects/RentCollectible';
import NotFound from '@templates/404';

// API
import { withApollo } from '@api/apollo';
import { GET_NFT_ACTIONS } from '@templates/projects/CollectibleDetails';

function PutOnRentNFT({ projectId, nftId }) {
  const { loading, data: { nft } = {} } = useQuery(GET_COLLECTIBLE, {
    variables: {
      projectId,
      nftId: Number(nftId)
    }
  });

  const [putOnRentNFT] = useMutation(PUT_ON_RENT_NFT, {
    update: (cache, { data: { putOnRentNFT } }) => {
      cache.writeQuery({
        query: GET_NFT_ACTIONS,
        variables: {
          projectId,
          nftId: Number(nftId)
        },
        data: {
          nft: {
            acquired: putOnRentNFT.nft.acquired
          }
        }
      });
    }
  });

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

      nft {
        acquired
      }

      user {
        address
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId, nftId } }) {
  return {
    props: {
      projectId,
      nftId
    }
  };
}

export default withApollo()(PutOnRentNFT);
