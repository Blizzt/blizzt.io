// Dependencies
import React from 'react';
import Loader from 'react-loader-spinner';

// Styled Components
import {
  Layout,
  Title,
  Indicator,
  Logotype
} from './styles';
import { PageContainer, PageMargin } from '@styled-components/pagination';

import { common } from '@styled-components/common';

// Assets
import BlizztLogo from '@assets/images/blizzt-logo-token.svg';

// Layouts
import PageLayout from '@layouts/PageLayout';

function LoadingTemplate({ text }) {
  return (
    <PageLayout title={text}>
      <PageContainer>
        <PageMargin>
          <Layout>
            <Indicator>
              <Loader
                type={'TailSpin'}
                color={common.colors.PRIMARY}
                height={100}
                width={100}
              />
              <Logotype src={BlizztLogo} alt={'Loading'} />
            </Indicator>
            <Title>{text}</Title></Layout>
        </PageMargin>
      </PageContainer>
    </PageLayout>
  );
}

export default LoadingTemplate;
