// Dependencies
import React, { useState } from 'react';

// Layouts
import PageLayout from '@layouts/PageLayout';

// Components
import Gallery from '@components/exhibitors/Gallery';
import HorizontalGallery from '@components/exhibitors/HorizontalGallery';
import GameCard from '@components/cards/GameCard';

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
            title={'Latest Released'}
            data={latestProjects}
            renderItem={(project) => (
              <GameCard
                name={project.title}
                categoryId={project.categoryId}
                pictureUrl={project.photoUrl}
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
