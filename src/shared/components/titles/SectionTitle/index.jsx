// Dependencies
import React from 'react';

// Styled Components
import {
  Container,
  Title,
  Description,
  SectionField
} from './styles';
import { PageMargin } from '@styled-components/pagination';

export const SectionTitle = ({ title, description, children }) => (
  <>
    <PageMargin>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </PageMargin>
    <SectionField>
      {children}
    </SectionField>
  </>
);

export default SectionTitle;
