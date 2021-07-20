// Dependencies
import React from 'react';

// Styled Components
import {
  Project,
  ProjectImage,
  ProjectDetails,
  ProjectName,
  ProjectCount
} from './styles';

// Components
import MainImage from '@components/images/MainImage';

// Types
import { imageAspectRatio } from '@types/images';

function ProjectSummaryCard({
  onClick = () => {},
  pictureUrl,
  name,
  collectiblesCount
}) {
  return (
    <Project onClick={onClick}>
      <ProjectImage>
        <MainImage
          aspectRatio={imageAspectRatio.SIXTEEN}
          source={pictureUrl}
          radius={4}
        />
      </ProjectImage>
      <ProjectDetails>
        <ProjectName>{name}</ProjectName>
        <ProjectCount>Quantity of collectibles: {collectiblesCount}</ProjectCount>
      </ProjectDetails>
    </Project>
  );
}

export default ProjectSummaryCard;
