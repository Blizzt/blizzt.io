// Assets
import ETHTokenIcon from '@assets/images/etherum-logo-token.svg';
import DAITokenIcon from '@assets/images/dai-logo-token.svg';
import USDTTokenIcon from '@assets/images/thether-logo-token.svg';
import BLZTTokenIcon from '@assets/images/blizzt-logo-token.svg';

export const chainsTypeId = {
  ETH: '1',
  ROPSTEN: '3',
  KOVAN: '42',
  RINKEBY: '4',
  GOERLI: '5',
  BSC: '38',
  BSCTESTNET: '61',
  POLYGON: '89',
  XDAI: '64',
  GANACHE: '539'
};

export const networkTypes = {
  UNSUPPORTED: 0,
  TESTNET: 1,
  MAINNET: 2
};

export const networkType = {
  [chainsTypeId.ETH]: networkTypes.MAINNET,
  [chainsTypeId.ROPSTEN]: networkTypes.UNSUPPORTED,
  [chainsTypeId.KOVAN]: networkTypes.UNSUPPORTED,
  [chainsTypeId.RINKEBY]: networkTypes.TESTNET,
  [chainsTypeId.GOERLI]: networkTypes.UNSUPPORTED,
  [chainsTypeId.BSC]: networkTypes.MAINNET,
  [chainsTypeId.BSCTESTNET]: networkTypes.TESTNET,
  [chainsTypeId.POLYGON]: networkTypes.MAINNET,
  [chainsTypeId.XDAI]: networkTypes.MAINNET,
  [chainsTypeId.GANACHE]: networkTypes.UNSUPPORTED
};

export const chainsNetworkName = {
  [chainsTypeId.ETH]: 'Ethereum',
  [chainsTypeId.ROPSTEN]: 'Ropsten',
  [chainsTypeId.KOVAN]: 'Kovan',
  [chainsTypeId.RINKEBY]: 'Rinkeby',
  [chainsTypeId.GOERLI]: 'Goerli',
  [chainsTypeId.BSC]: 'Binance',
  [chainsTypeId.BSCTESTNET]: 'Binance Testnet',
  [chainsTypeId.POLYGON]: 'Polygon (Matic)',
  [chainsTypeId.XDAI]: 'xDai',
  [chainsTypeId.GANACHE]: 'Ganache'
};

export const currencyTypesId = {
  ETH: 'ETH',
  DAI: 'DAI',
  USDT: 'USDT',
  BLZT: 'BLZT'
};

export const currencyTypesData = {
  [currencyTypesId.ETH]: {
    name: 'Ethereum',
    symbol: 'ETH',
    code: '0x0000000000000000000000000000000000000000',
    image: ETHTokenIcon
  },
  [currencyTypesId.DAI]: {
    name: 'Dai',
    symbol: 'DAI',
    code: '0x0000000000000000000000000000000000000001',
    image: DAITokenIcon
  },
  [currencyTypesId.USDT]: {
    name: 'Tether',
    symbol: 'USDT',
    code: '0x626fdbfF6D1B75237121415b8eD178543AF0981c',
    image: USDTTokenIcon
  },
  [currencyTypesId.BLZT]: {
    name: 'Blizzt',
    symbol: 'BLZT',
    code: '0x0000000000000000000000000000000000000003',
    image: BLZTTokenIcon
  }
};
