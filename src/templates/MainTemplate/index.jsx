// Dependencies
import React, { useState } from 'react';

// Layouts
import PageLayout from '@layouts/PageLayout';

// Components
import Gallery from '@components/exhibitors/Gallery';
import HorizontalGallery from '@components/exhibitors/HorizontalGallery';
import ProjectCard from '@components/cards/ProjectCard';

// Styled Components
import {
  Container,
  BlurHeader
} from './styles';
import { PageContainer } from '@styled-components/pagination';

function MainTemplate({ title, latestProjects = [] }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <PageLayout title={title}>
      <PageContainer>
        <BlurHeader image={activeItem?.photo}>
          <Container>
            <Gallery onChangeActive={setActiveItem} />
          </Container>
        </BlurHeader>
        <Container>
          <div style={{ height: '4rem' }} />
          <HorizontalGallery
            data={latestProjects}
            renderItem={(project) => (
              <ProjectCard
                name={project.name}
                photo={project.photo}
                categoryId={project.categoryId}
                description={project.description}
                collectiblesCount={project.collectiblesCount}
                collectiblesSold={project.collectiblesSold}
                path={`/projects/${project._id}`}
              />
            )}
          />
          <div style={{ height: '4rem' }} />
        </Container>
      </PageContainer>
    </PageLayout>
  );
}

export default MainTemplate;
