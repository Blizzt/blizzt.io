// Dependencies
import Web3 from 'web3';
import gql from 'graphql-tag';
import { NetworkStatus } from 'apollo-client';
import { getUnixTime } from 'date-fns';

// API
import createApolloClient from '../../../../apollo.client';

// Contracts
import NFTCollection from '@contracts/abis/NFTCollection.json';
import NFTMarketplace from '@contracts/abis/NFTMarketplace.json';
import NFTCollectionFactory from '@contracts/abis/NFTCollectionFactory.json';
import IERC20 from '@contracts/abis/IERC20.json';
import Addresses from '@contracts/addresses';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';
import { offerStatesId } from '@types/offers';

// Utils
import { getDisplayType, IPFS } from '@utils/web3';

const NFT = {
  buy: function(chainId, offerId, quantity) {
    return new Promise(async(resolve, reject) => {
      try {
        // API initialization.
        const API = await createApolloClient();

        // We get the updated offer information.
        const { data: { offer }, networkStatus } = await API.query({
          query: GET_OFFER_BY_ID,
          variables: {
            id: Number(offerId)
          }
        });

        // Error if the offer cannot be obtained
        if (networkStatus === NetworkStatus.error) {
          return reject(new Error('Unable to get current offer.'));
        }

        // Error if offer has changed to INACTIVE status during checkout.
        if (offer.state === offerStatesId.INACTIVE) {
          return reject(new Error('The offer is already inactive'));
        }

        // Error if the number of available NFTs has changed and is less than requested.
        if (quantity > offer.quantity) {
          return reject(new Error('The offer no longer has the required quantity'));
        }

        // We initialize Web3
        const web3 = new Web3(window.ethereum);

        const {
          methods: {
            sellERC1155
          }
        } = new web3.eth.Contract(NFTMarketplace, Addresses[chainId].NFTMarketplace);

        const buyLength = (offer.message.length / 2) - 1;
        const paramLength = web3.utils.asciiToHex(buyLength.toString());

        const buyItem = sellERC1155(offer.message, paramLength, Number(quantity), offer.fingerprint);
        const price = offer.price * quantity;

        const isEthereum = currencyTypesData[offer.currency.id].code === currencyTypesData[currencyTypesId.ETH].code;

        const tx = await buyItem.send({
          from: window.ethereum.selectedAddress,
          value: isEthereum ? web3.utils.toWei((price * quantity).toString()) : 0
        });

        console.log({ tx });

        const { networkStatus: buyNetworkStatus } = await API.query({
          query: BUY_NFT,
          variables: {
            offerId: offer.id,
            amount: Number(quantity)
          }
        });

        console.log({ buyNetworkStatus });

        if (buyNetworkStatus === NetworkStatus.error) {
          /* Critical error: You have made the purchase but it has not been transacted.
             Evaluate how this error can be considered, and to what extent it can be resolved. */
        }

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  },

  mint: function(chainId, projectId, collectible) {
    return new Promise(async(resolve, reject) => {
      try {
        // Apollo Client
        const apollo = createApolloClient();

        const { networkStatus, data: { project } = {} } = await apollo.query({
          query: GET_PROJECT_BY_ID,
          variables: {
            id: projectId
          }
        });

        if (networkStatus === NetworkStatus.error) {
          throw new Error({
            message: 'Could not get current project.'
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

        const nftId = project.nftsCount + 1;
        let collectionAddress = '';

        // Web3
        const web3 = new Web3(window.ethereum);
        let tx = {};

        if (project.collectionAddress) {
          // Mint the collectibles collectibles
          const {
            methods: {
              mint
            }
          } = new web3.eth.Contract(NFTCollection, project.collectionAddress);

          const mintItem = await mint(window.ethereum.selectedAddress, nftId, collectible.amount, metadataCidIpfs);
          tx = await mintItem.send({
            from: window.ethereum.selectedAddress
          });

          collectionAddress = project.collectionAddress;

          console.log({ tx });
        } else {
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

        const { networkStatus: mintNFTNetworkStatus } = await apollo.mutate({
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

        if (mintNFTNetworkStatus === NetworkStatus.error) {
          /* Critical error: You have made the purchase but it has not been transacted.
            Evaluate how this error can be considered, and to what extent it can be resolved. */
        }

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
};

export default NFT;

/**
 * =============================
 * GraphQL Queries and Mutations
 * =============================
 */

const GET_OFFER_BY_ID = gql`
  query GetOffer($id: Int!) {
    offer(id: $id) {
      id
      price
      state
      quantity

      message
      fingerprint

      currency {
        id
      }
    }
  }
`;

const BUY_NFT = gql`
  mutation buyNFT(
    $offerId: Int!
    $amount: Int!
  ) {
    buyNFT(offerId: $offerId, amount: $amount) {
      id
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      chainId
      description
      isPublic
      photoUrl
      createdAt
      nftsCount

      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

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
