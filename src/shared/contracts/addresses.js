/**
 * See all ids below
 * https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids
 */
import { chainsTypeId } from '@types/web3';

const Addresses = {
  [chainsTypeId.ETH]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.POLYGON]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.XDAI]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.BSC]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.RINKEBY]: {
    BizztToken: '0x5bFc4F729D354c6A527E87Bd10c9D44ebC121A27',
    BlizztStake: '0x5ae0658d47ba5868661c5eD1D1De3c114D0BF8e4',
    NFTCollectionFactory: '0x900610c01760178c33b9A2fC1c723F3b43455d82',
    NFTMarketplace: '0x2c89457a07A5b57308ce43061Db1D91D6166D41f'
  },
  [chainsTypeId.ROPSTEN]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.GOERLI]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.KOVAN]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.BSCTESTNET]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  },
  [chainsTypeId.GANACHE]: {
    BizztToken: '',
    BlizztStake: '',
    NFTCollectionFactory: '',
    NFTMarketplace: ''
  }
};

export default Addresses;
