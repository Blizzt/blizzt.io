// Dependencies
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import SellCollectibleTemplate from '@templates/projects/SellCollectible';
import NotFound from '@templates/404';

// API
import { withApollo } from '@api/apollo';
import { GET_NFT_ACTIONS } from '@templates/projects/CollectibleDetails';

function PutOnSaleNFT({ projectId, nftId }) {
  const { loading, data: { nft } = {} } = useQuery(GET_COLLECTIBLE, {
    variables: {
      projectId,
      nftId: Number(nftId)
    }
  });

  const [putOnSaleNFT] = useMutation(PUT_ON_SALE_NFT, {
    update: (cache, { data: { putOnSaleNFT } }) => {
      cache.writeQuery({
        query: GET_NFT_ACTIONS,
        variables: {
          projectId,
          nftId: Number(nftId)
        },
        data: {
          nft: {
            acquired: putOnSaleNFT.nft.acquired
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

export default withApollo()(PutOnSaleNFT);
