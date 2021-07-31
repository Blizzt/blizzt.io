// Dependencies
import React from 'react';

// Styled Components
import {
  Content,
  Grid,
  RightContent,
  LeftContent,
  Section
} from './styles';

import { PageContainer } from '@styled-components/pagination';

// Components
import SectionList from '@components/lists/SectionList';
import ProjectCard from '@components/cards/ProjectCard';

// Mock
import { sections } from './mock';

// Layouts
import PageLayout from '@layouts/PageLayout';

// Memo
export const MemorizedProjectCard = React.memo(ProjectCard);

function ProjectsTemplate({
  projects = []
}) {
  return (
    <PageLayout title={'Discover Projects'}>
      <PageContainer>
        <Content>
          <LeftContent>
            <SectionList
              data={sections}
            />
          </LeftContent>
          <RightContent>
            <Section>
              <Grid>
                {(projects).map((project, index) => (
                  <MemorizedProjectCard
                    key={`--project-item-card-${index.toString()}`}
                    title={project.title}
                    photoUrl={project.photoUrl}
                    category={project.category}
                    description={project.description}
                    collectiblesCount={project.nftsCount}
                    collectiblesSold={0}
                    path={`/projects/${project.id}`}
                  />
                ))}
              </Grid>
            </Section>
          </RightContent>
        </Content>
      </PageContainer>
    </PageLayout>
  );
}

export default ProjectsTemplate;
