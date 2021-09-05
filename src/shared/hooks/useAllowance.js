// Dependencies
import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

// Contracts
import IERC20 from '@contracts/abis/IERC20.json';
import Addresses from '@contracts/addresses';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';
function useAllowance(fromToken, price, amount) {
  const { chainId } = useWeb3React();
  const [allowed, setAllowed] = useState(false);

  const fetchAllowance = useCallback(async(fromToken, price, amount, chainId) => {
    const web3 = new Web3(window.ethereum);
    if (fromToken !== currencyTypesId.ETH) {
      const {
        methods: {
          allowance
        }
      } = new web3.eth.Contract(IERC20, currencyTypesData[fromToken].code);

      const allowedAmountFx = await allowance(window.ethereum.selectedAddress, Addresses[chainId].NFTMarketplace);
      console.log({ allowedAmountFx });

      const allowedAmount = await allowedAmountFx.call({
        from: window.ethereum.selectedAddress
      });

      return (Number(allowedAmount) >= (price * amount));
    }
    return false;
  }, []);

  useEffect(() => {
    fetchAllowance(fromToken, price, amount, chainId).then(setAllowed);
  }, [fromToken, price, amount, chainId]);

  const approve = useCallback(async() => {
    const web3 = new Web3(window.ethereum);
    const {
      methods: {
        approve
      }
    } = new web3.eth.Contract(IERC20, currencyTypesData[fromToken].code);
    const approveAmount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2^256 - 1 )

    const approveFx = await approve(Addresses[chainId].NFTMarketplace, approveAmount);
    const tx = approveFx.send({
      from: window.ethereum.selectedAddress
    });

    console.log({ tx });
    return true;
  }, [chainId]);

  return { allowed, approve };
}

export default useAllowance;
