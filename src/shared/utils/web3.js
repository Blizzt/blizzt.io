// Dependencies
import { InjectedConnector } from '@web3-react/injected-connector';
import { formatUnits } from '@ethersproject/units';
import IPFSClient from 'ipfs-http-client';

export const IPFS = (typeof window !== 'undefined') ? new IPFSClient({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https'
}) : null;

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.'
};

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {[number, string]} data
 */
export function formatEtherscanLink(type, chainId, address) {
  switch (type) {
    case 'Account': {
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case 'Transaction': {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
  Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);

export function getDisplayType({ value, maxValue = null }) {
  const isNumericValue = parseInt(value, 0);

  if (maxValue || maxValue !== '') {
    const isNumericMaxValue = parseInt(maxValue, 0);

    if (isNumericValue && !isNumericMaxValue) {
      return 'number';
    } else if (isNumericValue && isNumericValue) {
      return 'boost_percentage';
    } else {
      return '';
    }
  } else {
    if (isNumericValue) {
      return 'number';
    } else {
      return '';
    }
  }
}
