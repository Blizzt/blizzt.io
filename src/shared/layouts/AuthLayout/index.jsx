// Dependencies
import React from 'react';
import { useWeb3React } from '@web3-react/core';

// Templates
import MetamaskConnect from '@templates/MetamaskConnect';
import NotFoundTemplate from '@templates/404';

function AuthLayout({ only = null, children }) {
  // Hooks
  const { account, library, active } = useWeb3React();

  if (!active || library === undefined) {
    return (
      <MetamaskConnect />
    );
  }

  if (only && account !== only) {
    return (
      <NotFoundTemplate />
    );
  }

  return children;
}

export default AuthLayout;
