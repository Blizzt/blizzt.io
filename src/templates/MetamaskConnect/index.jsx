// Dependencies
import React, { useState } from 'react';
import ModelViewer from '@metamask/logo';
import { useIsomorphicLayoutEffect } from 'react-use';

// Styled Components
import {
  Logo,
  Layout,
  Container,
  Title,
  Description
} from './styles';
import PageLayout from '@layouts/PageLayout';

function MetamaskConnect() {
  const [viewer, setViewer] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (!viewer) {
      setViewer(
        ModelViewer({
          pxNotRatio: true,
          width: 200,
          height: 200,
          followMouse: false,
          slowDrift: false
        })
      );
    } else {
      const container = document.getElementById('logo-container');
      if (!container.hasChildNodes()) {
        container.appendChild(viewer.container);
      }
      viewer.setFollowMouse(true);
    }

    return () => {
      if (viewer) {
        viewer.stopAnimation();
        setViewer(null);
      }
    };
  }, [viewer]);

  return (
    <PageLayout title={'Connect with Metamask to continue...'}>
      <Layout>
        <Logo id="logo-container" />
        <Container>
          <Title>Connect with MetaMask to continue</Title>
          <Description>To access this part of the platform you need to be connected to a wallet.</Description>
        </Container>
      </Layout>
    </PageLayout>
  );
}

export default MetamaskConnect;
