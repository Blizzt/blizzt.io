// Dependencies
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Blockies from 'react-blockies-image';

// Web3
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useIsomorphicLayoutEffect } from 'react-use';

// Utils
import { injected } from '@utils/web3';

// Hooks
import useENSName from '@hooks/useENSName';
import useETHBalance from '@hooks/useETHBalance';

// Components
import MainButton from '@components/buttons/MainButton';
import BalanceIndicator from '@components/indicators/BalanceIndicator';
import NetworkIndicator from '@components/indicators/NetworkIndicator';

// Styled Components
import {
  Layout,
  UserInfo,
  ProfileAction,
  ImageSource
} from './styles';

// Assets
import { ChevronDownOutline } from 'react-ionicons';

// Utils
import { common } from '@styled-components/common';
import AccountMenu from '@components/menus/AccountMenu';

const Account = ({ triedToEagerConnect }) => {
  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError
  } = useWeb3React();
  const { data: balance } = useETHBalance(account);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const onClickUserAccount = useCallback(() => {
    setMenuVisible(!isMenuVisible);
  }, [isMenuVisible]);

  // initialize metamask onboarding
  const onboarding = useRef();

  useIsomorphicLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3;

    return (
      <Layout>
        {hasMetaMaskOrWeb3Available ? (
          <MainButton
            caption={MetaMaskOnboarding.isMetaMaskInstalled() ? 'Connect to MetaMask' : 'Connect to Wallet'}
            onClick={() => {
              setConnecting(true);
              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          />
        ) : (
          <MainButton
            caption={'Install Metamask'}
            onClick={() => onboarding.current?.startOnboarding()}
          />
        )}
      </Layout>
    );
  }

  /*
      <a
      {...{
        href: formatEtherscanLink('Account', [chainId, account]),
        target: '_blank',
        rel: 'noopener noreferrer'
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
   */
  return (
    <Layout>
      <UserInfo>
        <NetworkIndicator
          chainId={chainId}
        />
        <BalanceIndicator
          balance={balance}
        />
        <ProfileAction onClick={onClickUserAccount}>
          <ImageSource>
            <Blockies
              seed={account}
              size={10}
              color={common.colors.PRIMARY_LIGHT}
              bgColor={common.colors.PRIMARY}
              spotColor={common.colors.PRIMARY}
            />
          </ImageSource>
          <ChevronDownOutline
            width={'16px'}
            height={'16px'}
          />
        </ProfileAction>
        {isMenuVisible && (
          <AccountMenu
            onDismiss={onClickUserAccount}
            address={account}
            chainId={chainId}
            balance={balance}
          />
        )}
      </UserInfo>
    </Layout>
  );
};

export default Account;
