import useContract from './useContract';

import ABI from '@contracts/abis/BlizztToken.json';

/**
 * @name useERC20Contract
 * @description Uses the new Human-Readable ABI format from ethers v5. Supports ERC20 contract functions of 'balanceOf', 'transfer', and the 'Transfer' event itself.
 * @param {string} tokenAddress
 */
export default function useERC20Contract(tokenAddress) {
  return useContract(tokenAddress, ABI);
}
