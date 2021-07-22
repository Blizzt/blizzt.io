// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useCookies } from 'react-cookie';
import { useMutation } from '@apollo/react-hooks';

// Components
import Header from '@components/navigation/Header';
import SuperModal from '@components/modals/SuperModal';

// Templates
import LoadingTemplate from '@templates/Loading';

// Types
import { X_TOKEN_COOKIE } from '@types/cookiess';

// API
import { OBTAIN_USER_FROM_WALLET } from '@api/auth';
import { withApollo } from '@api/apollo';

function AppLayout({ children }) {
  // GraphQL
  const [isReady, setReady] = useState(true);

  const currentAccount = useRef(null);
  const [obtainUserFromWallet] = useMutation(OBTAIN_USER_FROM_WALLET);

  // Web3
  const { chainId, account, active } = useWeb3React();
  const [cookies, setCookie, removeCookie] = useCookies([X_TOKEN_COOKIE]);

  useEffect(() => {
    const isUserSync = cookies[X_TOKEN_COOKIE] !== undefined;

    if (!active && isUserSync) {
      removeCookie(X_TOKEN_COOKIE, { path: '/' });
    }

    if (active && account) {
      if (!isUserSync) {
        obtainUserFromWallet({
          variables: {
            wallet: account
          }
        }).then(({ data: { obtainUserFromWallet: { token } } }) => {
          setCookie(X_TOKEN_COOKIE, token, { path: '/' });
          currentAccount.current = account;
        });
      }
    }
  }, [chainId, account, cookies, active, removeCookie]);

  useEffect(() => {
    if (account && currentAccount.current) {
      if (account !== currentAccount.current) {
        setReady(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        removeCookie(X_TOKEN_COOKIE, { path: '/' });
      }
    }
  }, [currentAccount.current, account]);

  if (typeof window !== 'undefined' && !isReady) {
    return (
      <LoadingTemplate
        text={'Applying changes, please wait...'}
      />
    );
  }

  return (
    <>
      <Header />
      <SuperModal />
      {children}
    </>
  );
}

export default withApollo({ ssr: true })(AppLayout);
