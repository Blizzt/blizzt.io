// Dependencies
import React, { useMemo } from 'react';

// Styled Components
import {
  Layout,
  Bottom,
  Title,
  Category
} from './styles';

// Components
import MainImage from '@components/images/MainImage';

// Types
import { categories } from '@types/categories';

function GameCard({ name, pictureUrl, categoryId = 12 }) {
  const category = useMemo(() => categories.filter(e => e.id === categoryId)[0], [categoryId]);

  return (
    <Layout>
      <MainImage source={pictureUrl} alt={name} />
      <Bottom>
        <Title>{name}</Title>
        <Category>{category.label}</Category>
      </Bottom>
    </Layout>
  );
}

export default GameCard;
