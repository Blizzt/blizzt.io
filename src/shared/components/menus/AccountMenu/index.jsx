// Dependencies
import React, { useRef } from 'react';
import Link from 'next/link';
import Blockies from 'react-blockies-image';

// Styled Components
import {
  Layout,
  Block,
  Image,
  Title,
  Label,
  Row,
  Navigator,
  Address,
  Balance,
  NavLink,
  Picture
} from './styles';
import { common } from '@styled-components/common';

// Utils
import { formatEtherscanLink, shortenHex } from '@utils/web3';
import { currencyTypesId } from '@types/web3';

// Components
import PriceIndicator from '@components/indicators/PriceIndicator';

// Hooks
import useOnClickOutside from '@hooks/useOnClickOutside';

function AccountMenu({
  address = '',
  chainId = 1,
  balance = '0,000000',
  onDismiss = () => {},
  user = null
}) {
  // Hooks
  const ref = useRef(null);
  useOnClickOutside(ref, onDismiss);

  return (
    <Layout ref={ref}>
      <Block>
        <Image>
          {!user || !user.photoUrl ? (
            <Blockies
              size={16}
              seed={address}
              bgColor={common.colors.PRIMARY}
              spotColor={common.colors.PRIMARY}
              color={common.colors.PRIMARY_LIGHT}
            />
          ) : (
            <Picture src={user.photoUrl} alt={user.username} />
          )}
        </Image>
      </Block>
      <Block>
        <Row>
          <Label>Wallet Address</Label>
          <Link
            href={formatEtherscanLink('Account', [chainId, address])}
            target={'_blank'}>
            <Address>
              {shortenHex(address, 4)}
            </Address>
          </Link>
        </Row>
        <Row>
          <Label>Balance</Label>
          <Balance>
            <PriceIndicator
              currency={currencyTypesId.BLZT}
              value={balance}
            />
          </Balance>
        </Row>
      </Block>
      <Block>
        <Row>
          <Title>Account</Title>
          <Navigator>
            <NavLink href={`/user/${address}/projects`}>Projects</NavLink>
            <NavLink href={`/user/${address}/transactions`}>Transactions</NavLink>
            <NavLink href={`/user/${address}/inventory`}>Inventory</NavLink>
            <NavLink href={'/history'}>History</NavLink>
            <NavLink href={`/user/${address}/favorites`}>Favorites</NavLink>
            <NavLink red={true} href={'#'}>Logout</NavLink>
          </Navigator>
        </Row>
      </Block>
    </Layout>
  );
}

export default AccountMenu;
