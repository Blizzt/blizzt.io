// Dependencies
import React from 'react';
import Link from 'next/link';

// Styled Components
import {
  Layout,
  Branding,
  ImageSource,

  Navigator,
  Item,

  Container,
  Left,
  Right,
  Center

} from './styles';

// Components
import Account from '@components/navigation/Account';
import SearchInput from '@components/navigation/SearchInput';

// Hooks
import useEagerConnect from '@hooks/useEagerConnect';

// Assets
import Logo from '@assets/images/blizzt-logo-square.svg';

function Header() {
  const triedToEagerConnect = useEagerConnect();

  return (
    <Layout>
      <Container>
        <Left>
          <Link href={'/'}>
            <Branding>
              <ImageSource src={Logo} alt={'Blizzt Finance - NFT Crowdfunding'} />
            </Branding>
          </Link>
          <Navigator count={2}>
            <Link href={'/'}>
              <Item>
                Discover
              </Item>
            </Link>
          </Navigator>
        </Left>
        <Center>
          <SearchInput />
        </Center>
        <Right>
          <Navigator count={2}>
            <Link href={'/projects/create'}>
              <Item special={true}>
                Start Project
              </Item>
            </Link>
          </Navigator>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </Right>
      </Container>
    </Layout>
  );
}

export default Header;
