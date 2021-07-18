// Dependencies
import React from 'react';
import Link from 'next/link';

// Assets
import {
  CompassOutline,
  AddOutline
} from 'react-ionicons';

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
  Center,
  ItemText,
  Menu

} from './styles';

// Components
import Account from '@components/navigation/Account';
import SearchInput from '@components/navigation/SearchInput';
import DiscoverMenu from '@components/navigation/DiscoverMenu';

// Hooks
import useEagerConnect from '@hooks/useEagerConnect';

// Assets
import Logo from '@assets/images/blizzt-logo-square.svg';

function Header() {
  // Web3
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
          <Navigator count={1}>
            <Item className={'with-menu-wrapper'}>
              <CompassOutline
                width={'24px'}
                height={'24px'}
              />
              <ItemText>
                Discover
              </ItemText>
              <Menu>
                <DiscoverMenu />
              </Menu>
            </Item>
          </Navigator>
        </Left>
        <Center>
          <SearchInput />
        </Center>
        <Right>
          <Navigator count={2}>
            <Link href={'/projects/create'}>
              <Item special={true}>
                <AddOutline
                  width={'24px'}
                  height={'24px'}
                  color={'#357ae0'}
                />
                <ItemText>
                  Add Project
                </ItemText>
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
