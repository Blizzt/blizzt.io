// Dependencies
import gql from 'graphql-tag';
import fetchAPI from '@utils/api';

// Utils
import errorHandler from '@utils/errorHandler';
import { IPFS } from '@utils/web3';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $description: String!
    $categoryId: Int!
    $photo: Upload!
  ) {
    createProject(
      title: $title
      description: $description
      categoryId: $categoryId
      photo: $photo
    ) {
      id
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation EditProject(
    $id: ID!
    $data: EditProjectInput!
  ) {
    editProject(
      id: $id
      data: $data
    ) {
      id
      title
      description
    }
  }
`;

export const GET_PROJECT_DETAILS_FOR_EDIT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      isPublic
      description
      document
      photoUrl
      createdAt
      
      category {
        id
      }
      
      details {
        web
        kickstarter
        steam
        playstation
        xbox
        android
        ios
        twitch
        youtube
        facebook
        twitter
        instagram
        vk
        discord
        reddit
        telegram
      }
    }
  }
`;

export const GET_PROJECT_PAPER = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      chainId
      description
      isPublic
      photoUrl
      createdAt
      document
      
      details {
        web
        steam
        xbox
        playstation
        android
        ios
        kickstarter
        instagram
        youtube
        twitch
        twitter
        facebook
        vk
        discord
        reddit
        telegram
      }
      
      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

export const GET_PROJECT_DETAILS = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      chainId
      description
      isPublic
      photoUrl
      createdAt
           
      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

export const GET_PROJECT_COLLECTIBLES = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      chainId
      description
      isPublic
      photoUrl
      createdAt
      
      nfts {
        id
        nftId
        IPFSAddress
        metadata
      }
           
      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

export const GET_COLLECTIBLE = gql`
  query GetNFT($projectId: ID!, $nftId: Int!) {
    nft(projectId: $projectId, nftId: $nftId) {
      id
      type
      IPFSAddress
      metadata
      
      acquired 
            
      forRent {
        state
      }
      
      forSale {
        state
      }
  
      project {
        id
        title
        description
        photoUrl
        createdAt
      }
    }
  }
`;

const ProjectAPI = {
  /**
   * Get all projects from the API.
   * @param page Current page to display
   * @param limit Limit of projects in the consultation.
   */
  all: async(credentials, page = 0, limit = 10) => {
    return await fetchAPI({
      endPoint: '/projects',
      method: 'GET',
      credentials
    });
  },

  getById: async(projectId) => {
    return await fetchAPI({
      endPoint: `/projects/${projectId}`,
      method: 'GET'
    });
  },

  getNFTIds: async(nftCollectionAddress) => {
    return await fetchAPI({
      endPoint: `/nfts/${nftCollectionAddress}/ids`,
      method: 'GET'
    });
  },

  create: async(project, { account, chainId }) => {
    return await fetchAPI({
      endPoint: '/projects',
      method: 'POST',
      attachment: project.photo,
      body: {
        name: project.name,
        categoryId: project.categoryId,
        description: project.description,
        ownerAddress: account
      }
    }, { address: account, userChainId: chainId });
  },

  edit: async(projectId, { dataToSign, signature, photo = null, ...data }) => {
    return await fetchAPI({
      endPoint: `/projects/${projectId}`,
      method: 'PATCH',
      attachment: photo ?? null,
      body: {
        ...data,
        dataSigned: dataToSign,
        signature: signature
      }
    });
  },

  getCollectibles: async(nftCollectionAddress) => {
    const response = await fetchAPI({
      endPoint: `/nfts/${nftCollectionAddress}/ids`,
      method: 'GET'
    });

    if (response && response.statusCode === 200) {
      const { data } = response;
      console.log('RESPONSE', response);

      // Obtain NFT ids to get metadata from IFPS
      const ids = data.map(function(item) {
        return {
          nftId: Number(item.nftId),
          metadata: item.metadata
        };
      });

      const collectibles = {};

      // TODO: Jorge, esto debería volver los metadatos de IPFS.
      await Promise.all(
        ids.map(async(collectible) => {
          response.log('COLLECTIBLES', collectible);
          const meta = collectible.metadata;
          const data = await IPFS.get(meta); // TODO: Esto devuelve un generador "suspended"

          collectibles[collectible.nftId] = {
            id: collectible.nftId,
            ...data
          };
        })
      );

      console.log({ ids, collectibles });
    }
  },

  getCollectibleById: async(nftCollectionAddress, collectibleId) => {
    try {
      let collectible = {};

      const response = await fetchAPI({
        endPoint: `/nfts/${nftCollectionAddress}/${collectibleId}`,
        method: 'GET'
      });

      if (response && response.statusCode === 200) {
        const data = response.data[0];

        collectible = {
          id: data.nftId,
          ...data.metadata,
          mintedAmount: data.mintedAmount
        };

        const transactions = await ProjectAPI.getCollectibleTransactionById(nftCollectionAddress, collectibleId);

        if (transactions && transactions.statusCode === 200) {
          const { forSale, forRent } = transactions.data;
          collectible = {
            ...collectible,
            forSale,
            forRent
          };

          return {
            data: collectible
          };
        }
      }
    } catch (e) {
      return errorHandler(e.code);
    }
  },

  getCollectibleTransactionById: async(nftCollectionAddress, collectibleId) => {
    return await fetchAPI({
      endPoint: `/nftactions/${nftCollectionAddress}/${collectibleId}`
    });
  }
};

export default ProjectAPI;
