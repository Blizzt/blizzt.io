// Dependencies
import React, { useMemo } from 'react';
import { format } from 'date-fns';

// Styled Components
import {
  Layout,
  TopNavigatorFrame,
  Navigator,
  Item,
  Icon,
  Label,
  Container,

  Picture,
  Header,
  Column,

  Data,
  Title,
  CreatedAt
} from './styles';

// Utils
import { sectionList } from './utils';

// Components
import MainImage from '@components/images/MainImage';
import ActiveLink from '@components/links/ActiveLink';

// Types
import { imageAspectRatio } from '@types/images';

// Layouts
import PageLayout from '@layouts/PageLayout';
import AuthLayout from '@layouts/AuthLayout';

function ProjectEdit({ project, children, title = 'Edit Project' }) {
  const renderCreatedAt = useMemo(() => {
    if (!project || !project.createdAt) {
      return null;
    }
    return <CreatedAt>Created at {format(new Date(project.createdAt), 'PPPP')}</CreatedAt>;
  }, [project.createdAt]);

  return (
    <AuthLayout only={project.ownerAddress}>
      <PageLayout title={title}>
        <Layout>
          {/* Navigation Header */}
          <TopNavigatorFrame>
            <Header>
              <Column>
                <Picture>
                  <MainImage
                    radius={4}
                    aspectRatio={imageAspectRatio.SIXTEEN}
                    source={project.photoUrl}
                  />
                </Picture>
                <Data>
                  <Title>{project.title}</Title>
                  {renderCreatedAt}
                </Data>
              </Column>
            </Header>
            <Navigator>
              {(sectionList || []).map((section, index) => (
                <ActiveLink
                  activeClassName={'active'}
                  key={`--section-edit-key-${index.toString()}`}
                  href={`/projects/${project.id}/edit${section.path}`}
                >
                  <Item>
                    <Icon>{section.icon}</Icon>
                    <Label>{section.name}</Label>
                  </Item>
                </ActiveLink>
              ))}
            </Navigator>
          </TopNavigatorFrame>
          <Container>
            {children}
          </Container>
        </Layout>
      </PageLayout>
    </AuthLayout>
  );
}

export default ProjectEdit;
