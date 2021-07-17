import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { parseBalance } from '@utils/web3';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

import useERC20Contract from '@hooks/useERC20Contract';
import Addresses from '@contracts/addresses';
import { chainsTypeId } from '@types/web3';

function getBLZTBalance(contract, address) {
  return async(address, _) => {
    return contract.balanceOf(address).then((balance) => parseBalance(balance));
  };
}

export default function useETHBalance(address, suspense = false) {
  const { library, chainId = chainsTypeId.RINKEBY } = useWeb3React();
  const shouldFetch = typeof address === 'string' && !!library;
  const contract = useERC20Contract(Addresses[chainId].BizztToken);

  const result = useSWR(
    shouldFetch ? [address, chainId, 'BLZTBalance'] : null,
    getBLZTBalance(contract),
    {
      suspense
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
