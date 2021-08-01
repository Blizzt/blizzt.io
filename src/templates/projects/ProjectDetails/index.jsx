// Dependencies
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

// Styled Components
import {
  Layout,
  Header,
  Data,
  Title,
  Description,

  Navigator,

  Container,
  Body,

  Author,
  Address,
  AuthorLabel,
  AuthorImage,
  ContainerInner,
  TopContainer,
  FundingImage
} from './styles';

// Assets
import MoneyThree from '@assets/images/money-three.svg';

// Components
import NavigationList from '@components/lists/NavigationList';
import ProgressBarIndicator from '@components/indicators/ProgressBarIndicator';
import MainImage from '@components/images/MainImage';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';
import ProfileImage from '@components/images/ProfileImage';
import FundingIndicator from '@components/indicators/FundingIndicator';

// Utils
import { formatEtherscanLink, shortenHex } from '@utils/web3';
import { sectionList } from './utils';

// Types
import { imageAspectRatio } from '@types/images';

// Layouts
import PageLayout from '@layouts/PageLayout';
import { common } from '@styled-components/common';

function ProjectDetailsTemplate({
  project,
  children
}) {
  // Hooks
  const router = useRouter();

  const {
    account
  } = useWeb3React();

  /**
   * @function isOwnerOfProject():
   * @description Variable that determines if the project is owned by the logged in user.
   */
  const isOwnerOfProject = useMemo(() =>
    project && project.creator.address === account,
  [account, project]);

  /**
   * @function onClickEditMyProject():
   * @description Function that is triggered by pressing edit projects.
   */
  const onClickEditMyProject = useCallback(() => {
    router.push(`/projects/${project.id}/edit`);
  }, [project]);

  return (
    <PageLayout title={`${project.title} - Blizzt.io`}>
      <Layout background={project.photoUrl}>
        <Container>
          <TopContainer>
            <ContainerInner>
              <Header>
                <div>
                  <MainImage radius={6} source={project.photoUrl} />
                </div>
                <Data>
                  <Title>{project.title}</Title>
                  <Description>{project.description}</Description>
                  <Author>
                    <AuthorImage>
                      <ProfileImage
                        source={project.creator.photoUrl}
                        address={project.creator.address}
                        aspectRatio={imageAspectRatio.ONE}
                        alt={project.creator.address}
                      />
                    </AuthorImage>
                    <AuthorLabel>
                      Created by {project.creator.username}
                      <Address target={'_blank'} href={formatEtherscanLink('Account', project.chainId, project.creator.address)}>
                        {shortenHex(project.creator.address, 4)}
                      </Address>
                    </AuthorLabel>

                    {isOwnerOfProject && (
                      <MainButton
                        type={buttonTypesId.PRIMARY}
                        caption={'Edit Project'}
                        onClick={onClickEditMyProject}
                      />
                    )}
                  </Author>
                </Data>
              </Header>
            </ContainerInner>
          </TopContainer>
          <Body>
            {/* Navigator Container */}
            <ContainerInner>
              {children}
            </ContainerInner>

            {/* Navigation List */}
            <Navigator>
              <FundingIndicator
                icon={
                  <FundingImage src={MoneyThree} alt={'Funding Status'} />
                }
                max={250000}
                current={100000}
                bottom={(
                  <ProgressBarIndicator
                    color={common.colors.GREEN_HARD}
                    indicatorColor={common.colors.GREEN}
                    max={project.collectiblesCount}
                    current={project.collectiblesSold}
                    label={(max, current) => `${current} NFT have been sold out of the total of ${max} required`}
                  />
                )}
              />
              <NavigationList
                title={'About the project'}
                data={sectionList}
                baseUrl={`/projects/${project.id}`}
              />
            </Navigator>
          </Body>
        </Container>
      </Layout>
    </PageLayout>
  );
}

export default ProjectDetailsTemplate;
