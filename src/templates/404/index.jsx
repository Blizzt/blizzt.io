// Dependencies
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

// Styled Components
import {
  Layout,
  Title,
  SubTitle
} from './styles';
import { PageContainer, PageMargin } from '@styled-components/pagination';

// Assets
import Glitch404Lottie from '@assets/lotties/404-glitch.json';

// Layouts
import PageLayout from '@layouts/PageLayout';

function NotFound() {
  return (
    <PageLayout title={'Oops! This page is not available'}>
      <PageContainer>
        <PageMargin>
          <Layout>
            <Player
              autoplay
              loop={true}
              src={Glitch404Lottie}
              style={{ height: '200px', width: '200px' }}
            />
            <Title>This page is not available</Title>
            <SubTitle>It is possible that the link is broken or the page has been deleted. Verify that the link you want to open is correct.</SubTitle>
          </Layout>
        </PageMargin>
      </PageContainer>
    </PageLayout>
  );
}

export default NotFound;
