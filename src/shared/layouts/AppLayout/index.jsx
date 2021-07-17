// Dependencies
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useCookies } from 'react-cookie';

// Components
import Header from '@components/navigation/Header';
import SuperModal from '@components/modals/SuperModal';

function AppLayout({ children }) {
  const { chainId, account, active } = useWeb3React();
  const [cookies, setCookie, removeCookie] = useCookies(['userAddress', 'userChainId']);

  useEffect(() => {
    if (!active && cookies.userAddress) {
      removeCookie('userAddress');
    }

    if (account) {
      setCookie('userAddress', account, { path: '/' });
    }

    if (chainId) {
      setCookie('userChainId', chainId, { path: '/' });
    }
  }, [chainId, account, cookies, active]);

  return (
    <>
      <Header />
      <SuperModal />
      {children}
    </>
  );
}

export default AppLayout;
