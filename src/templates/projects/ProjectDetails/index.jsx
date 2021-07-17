// Dependencies
import React, { useCallback, useMemo } from 'react';
import Blockies from 'react-blockies-image';
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
  AuthorLabel,
  AuthorImage,
  ContainerInner,
  TopContainer,

  styles

} from './styles';
import { common } from '@styled-components/common';

// Components
import NavigationList from '@components/lists/NavigationList';
import ProgressBarIndicator from '@components/indicators/ProgressBarIndicator';
import MainImage from '@components/images/MainImage';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

// Utils
import { shortenHex } from '@utils/web3';
import { sectionList } from './utils';

// Layouts
import PageLayout from '@layouts/PageLayout';

function ProjectDetailsTemplate({
  project = {},
  children,
  title = null
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
    project && project.ownerAddress === account,
  [account, project]);

  /**
   * @function onClickEditMyProject():
   * @description Function that is triggered by pressing edit projects.
   */
  const onClickEditMyProject = useCallback(() => {
    router.push(`/projects/${project._id}/edit`);
  }, [project]);

  const renderLeftSide = useMemo(() => (
    <Left>
      <ContainerInner>
        <Header>
          <MainImage radius={6} source={project.photo} />
          <Data>
            <Title>{project.name}</Title>
            <Description>{project.description}</Description>
            <Author>
              <AuthorImage>
                <Blockies
                  seed={project.ownerAddress ?? ''}
                  size={10}
                  color={common.colors.PRIMARY_LIGHT}
                  bgColor={common.colors.PRIMARY}
                  spotColor={common.colors.PRIMARY}
                />
              </AuthorImage>
              <AuthorLabel>
                Created by {isOwnerOfProject ? 'You' : shortenHex(project.ownerAddress, 4)}
              </AuthorLabel>

              {isOwnerOfProject && (
                <MainButton
                  type={buttonTypesId.PRIMARY}
                  caption={'Edit Project'}
                  onClick={onClickEditMyProject}
                />
              )}
            </Author>

            <ProgressBarIndicator
              max={project.collectiblesCount}
              current={project.collectiblesSold}
              label={(max, current) => `${current} NFT have been sold out of the total of ${max} required`}
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
    <PageLayout title={title ?? project.name}>
      <Layout background={project.photo}>
        <Container>
          <TopContainer>
            {renderLeftSide}
            {renderRightSide}

            {/* Navigation List */}
            <NavigationList
              data={sectionList}
              customStyleContainer={styles.navigationList}
              baseUrl={`/projects/${project._id}`}
            />
          </TopContainer>
          <Body>
            {/* Navigator Container */}
            <ContainerInner>
              {children}
            </ContainerInner>
          </Body>
        </Container>
      </Layout>
    </PageLayout>
  );
}

export default ProjectDetailsTemplate;
