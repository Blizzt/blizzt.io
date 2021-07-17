// Dependencies
import fetchAPI from '@utils/api';

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
  }
};

export default ProjectAPI;
