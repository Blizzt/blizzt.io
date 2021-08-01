// Dependencies
import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useWeb3React } from '@web3-react/core';

// Templates
import CollectibleDetailsTemplate from '@templates/projects/CollectibleDetails';
import NotFound from '@templates/404';

// Components
import IPFSFetch from '@components/utils/IPFSFetch';

// API:
import createApolloClient from '../../../../../apollo.client';

// Context
import { useTheme } from '@styled-components/index';
import { modalTypesId } from '@types/ui';

function CollectibleDetails({ nft = null }) {
  // Context
  const { openModal } = useTheme();

  if (!nft) {
    return (
      <NotFound />
    );
  }

  const onClickBuy = useCallback(async({ offer, collectible }) => {
    openModal(modalTypesId.BUY_COLLECTIBLE, { offer, collectible });
  }, []);

  const onClickRent = useCallback((item) => {
    console.log('RENT: ', item);
  }, []);

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
          onClickBuy={onClickBuy}
          onClickRent={onClickRent}
        />
      )}
    />
  );
}

const GET_COLLECTIBLE = gql`
  query GetNFT($projectId: ID!, $nftId: Int!) {
    nft(projectId: $projectId, nftId: $nftId) {
      # Collectible Details
      nftId
      IPFSAddress
      metadata
      mintedAmount
      
      # Project Details
      project {
        id
        title
        nftsCount
        photoUrl
        collectionAddress
      }

      # Renting Listing
      forRent {
        user {
          address
          username
          photoUrl
          role
        }
        quantity
        price
        maxExpirationDate

        fiat {
          usd
          eur
          aed
          cny
          cny
          jpy
          rub
          gbp
        }

        currency {
          id
          symbol
        }
      }

      # Sale Listing
      forSale {
        user {
          address
          username
          photoUrl
          role
        }
        quantity
        price

        fiat {
          usd
          eur
          aed
          cny
          cny
          jpy
          rub
          gbp
        }

        currency {
          id
          symbol
        }
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
