// Dependencies
import { getUnixTime } from 'date-fns';
import Web3 from 'web3';

// API
import ProjectAPI from '@api/project';
import fetchAPI from '@utils/api';

// Utils
import { getDisplayType, IPFS } from '@utils/web3';

// Contracts
import Addresses from '@contracts/addresses';
import NFTCollection from '@contracts/abis/NFTCollection.json';
import NFTCollectionFactory from '@contracts/abis/NFTCollectionFactory.json';

const CollectibleAPI = {
  create: async({ chainId, projectId, collectible }) => {
    const web3 = new Web3(window.ethereum);
    const { statusCode, data: project } = await ProjectAPI.getById(projectId);

    if (statusCode !== 200 || !project) {
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
    let nftAddress = '';

    if (project.nftCollectionAddress) {
      const ntfsResponse = await ProjectAPI.getNFTIds(project.nftCollectionAddress);

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
      } = new web3.eth.Contract(NFTCollection, project.nftCollectionAddress);

      const mintItem = await mint(window.ethereum.selectedAddress, nftId, collectible.amount, metadataCidIpfs);
      const tx = await mintItem.send({
        from: window.ethereum.selectedAddress
      });

      nftAddress = project.nftCollectionAddress;
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

      await ProjectAPI.edit(project._id, {
        dataToSign: '',
        signature: '',
        nftCollectionAddress: tokenAddress,
        tx: tx
      });

      nftAddress = tokenAddress;
    }

    const ipfsAddress = `ipfs://${metadataCidIpfs}`;

    return await fetchAPI({
      endPoint: '/nfts',
      method: 'POST',
      body: {
        nftCollectionAddress: nftAddress,
        nftId,
        metadataJson: JSON.stringify(metadata),
        metadata: ipfsAddress,
        mintedAmount: collectible.amount
      }
    });
  }
};

export default CollectibleAPI;
