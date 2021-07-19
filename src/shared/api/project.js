// Dependencies
import fetchAPI from '@utils/api';
import { normalizeState, unNormalizeState } from '@utils/parsers';
import { IPFS } from '@utils/web3';

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
          const data = await IPFS.get(collectible.nftId); // TODO: Esto devuelve un generador "suspended"

          collectibles[collectible.nftId] = {
            id: collectible.nftId,
            ...data
          };
        })
      );

      console.log({ ids, collectibles });
    }
  }
};

export default ProjectAPI;
