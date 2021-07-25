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

  Left,
  Right,

  Container,
  Body,

  Author,
  Address,
  AuthorLabel,
  AuthorImage,
  ContainerInner,
  TopContainer,
  FundingImage,

  styles

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

  const renderLeftSide = useMemo(() => (
    <Left>
      <ContainerInner>
        <Header>
          <MainImage radius={6} source={project.photoUrl} />
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

            <FundingIndicator
              customStyleContainer={styles.fundingIndicator}
              icon={
                <FundingImage src={MoneyThree} alt={'Funding Status'} />
              }
              max={250000}
              current={100000}
              bottom={(
                <ProgressBarIndicator
                  color={common.colors.GREEN_SOFT}
                  indicatorColor={common.colors.GREEN}
                  max={project.collectiblesCount}
                  current={project.collectiblesSold}
                  label={(max, current) => `${current} NFT have been sold out of the total of ${max} required`}
                />
              )}
            />
          </Data>
        </Header>
      </ContainerInner>
    </Left>
  ), [project, isOwnerOfProject]);

  const renderRightSide = useMemo(() => (
    <Right>

    </Right>
  ), [project]);

  return (
    <PageLayout title={`${project.title} - Blizzt.io`}>
      <Layout background={project.photoUrl}>
        <Container>
          <TopContainer>
            {renderLeftSide}
            {renderRightSide}
          </TopContainer>
          <Body>
            {/* Navigator Container */}
            <ContainerInner>
              {children}
            </ContainerInner>

            {/* Navigation List */}
            <NavigationList
              title={'About the project'}
              data={sectionList}
              customStyleContainer={styles.navigationList}
              baseUrl={`/projects/${project.id}`}
            />
          </Body>
        </Container>
      </Layout>
    </PageLayout>
  );
}

export default ProjectDetailsTemplate;
