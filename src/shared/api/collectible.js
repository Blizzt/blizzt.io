// Dependencies
import gql from 'graphql-tag';
import { NetworkStatus } from 'apollo-client';
import { getUnixTime } from 'date-fns';
import Web3 from 'web3';

// API
import ProjectAPI, { GET_PROJECT_DETAILS } from '@api/project';
import createApolloClient from '../../../apollo.client';

// Utils
import { getDisplayType, IPFS } from '@utils/web3';

// Contracts
import Addresses from '@contracts/addresses';
import NFTCollection from '@contracts/abis/NFTCollection.json';
import NFTCollectionFactory from '@contracts/abis/NFTCollectionFactory.json';

export const MINT_NFT = gql`
  mutation MintNFT(
    $projectId: ID!
    $type: NFTType
    $nftId: Int!
    $collectionAddress: String!
    $metadata: String!
    $IPFSAddress: String!
    $amount: Int!
  ) {
    mintNFT(
      projectId: $projectId
      type: $type
      nftId: $nftId
      collectionAddress: $collectionAddress
      metadata: $metadata
      IPFSAddress: $IPFSAddress
      amount: $amount
    ) {
      nftId,
      project {
        title
      }
    }
  }
`;

export const SELL_NFT = gql`
  mutation SellNFT(
    $nftId: Int!
    $projectId: ID!
    $amount: Int!
    $price: String!
    $isBundlePack: Boolean!
    $currency: Currency!
    $message: String!
    $signature: String!
  ) {
    sellNFT(
      nftId: $nftId
      projectId: $projectId
      amount: $amount
      price: $price
      isBundlePack: $isBundlePack
      currency: $currency
      message: $message
      signature: $signature
    ) {
      project {
        id
      }
    }
  }
`;

const CollectibleAPI = {
  create: async({ chainId, projectId, collectible }) => {
    const apollo = createApolloClient();
    const web3 = new Web3(window.ethereum);

    const { networkStatus, data: { project } = {} } = await apollo.query({
      query: GET_PROJECT_DETAILS,
      variables: {
        id: projectId
      }
    });

    if (networkStatus === NetworkStatus.error) {
      throw new Error({
        message: 'This project not exists'
      });
    }

    // 1. Upload IPFS image
    const imageCid = await IPFS.add({
      content: collectible.photo
    });

    // 2. Build the file link
    const nftIPFS = `ipfs://${imageCid.path}`;

    // 3. Build the metadata
    const attributes = collectible.properties.map(function(item) {
      return {
        display_type: getDisplayType(item),
        trait_type: item.name,
        key: item.key,
        value: item.value,
        max_value: item.maxValue
      };
    });

    const metadata = {
      name: collectible.name,
      description: collectible.description,
      image: nftIPFS,
      external_url: '',
      attributes: [
        {
          display_type: 'number',
          trait_type: 'Minted units',
          value: collectible.amount
        },
        {
          display_type: 'date',
          trait_type: 'birthday',
          value: getUnixTime(new Date())
        },
        ...attributes
      ]
    };

    // 4. Upload the metadata to IPFS
    const metadataCid = await IPFS.add(Buffer.from(JSON.stringify(metadata)));

    const metadataCidIpfs = `${metadataCid.path}`;

    let nftId = 1;
    let collectionAddress = '';

    if (project.collectionAddress) {
      const ntfsResponse = await ProjectAPI.getNFTIds(project.collectionAddress);

      if (!ntfsResponse || ntfsResponse.statusCode !== 200) {
        throw new Error({
          message: 'Cannot get NTFS ids from Project'
        });
      }

      // Calculate the Id for the new NFT
      nftId = ntfsResponse.data.length + 1;

      // Mint the collectibles collectibles
      const {
        methods: {
          mint
        }
      } = new web3.eth.Contract(NFTCollection, project.collectionAddress);

      const mintItem = await mint(window.ethereum.selectedAddress, nftId, collectible.amount, metadataCidIpfs);
      const tx = await mintItem.send({
        from: window.ethereum.selectedAddress
      });

      collectionAddress = project.collectionAddress;
    } else {
      let tx = {};

      const contractAddress = Addresses[chainId.toString()].NFTCollectionFactory;

      const {
        methods: {
          createNFTCollectionWithFirstItem
        }
      } = new web3.eth.Contract(NFTCollectionFactory, contractAddress);

      const collection = await createNFTCollectionWithFirstItem('ipfs://', nftId, collectible.amount, metadataCidIpfs);

      const {
        events: {
          NFTCollectionCreated: {
            returnValues: {
              tokenAddress
            }
          }
        }
      } = await collection.send({
        from: window.ethereum.selectedAddress
      })
        .on('transactionHash', function(hash) {
          console.log('hash:', hash);
        })
        .on('receipt', function(receipt) {
          console.log('receipt:', receipt);
          tx = receipt;
        })
        .on('error', function(error) {
          console.log('error:', error);
        });

      collectionAddress = tokenAddress;
    }

    const IPFSAddress = `ipfs://${metadataCidIpfs}`;

    await apollo.mutate({
      mutation: MINT_NFT,
      variables: {
        nftId,
        projectId,
        collectionAddress,
        metadata: JSON.stringify(metadata),
        IPFSAddress,
        amount: collectible.amount
      }
    });

    return true;
  }
};

export default CollectibleAPI;
