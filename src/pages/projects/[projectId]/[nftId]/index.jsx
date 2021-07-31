// Dependencies
import React from 'react';
import gql from 'graphql-tag';

// Templates
import CollectibleDetailsTemplate from '@templates/projects/CollectibleDetails';
import NotFound from '@templates/404';

// Components
import IPFSFetch from '@components/utils/IPFSFetch';

// API:
import createApolloClient from '../../../../../apollo.client';

function CollectibleDetails({ nft = null }) {
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

const GET_COLLECTIBLE = gql`
  query GetNFT($projectId: ID!, $nftId: Int!) {
    nft(projectId: $projectId, nftId: $nftId) {
      nftId
      IPFSAddress
      metadata
      mintedAmount
      
      project {
        id
        title
        nftsCount
        photoUrl
      }

      forRent {
        user {
          address
        }
        quantity
        price
        currency
        maxExpirationDate
      }

      forSale {
        user {
          address
        }
        quantity
        price
        currency
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

export default CollectibleDetails;
