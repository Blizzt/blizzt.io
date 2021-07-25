// Dependencies
import React from 'react';
import Link from 'next/link';

// Styled Components
import {
  Layout,
  Bottom,
  Title,
  Category
} from './styles';

// Components
import MainImage from '@components/images/MainImage';

function GameCard({ id, name, pictureUrl, category }) {
  return (
    <Link href={`/projects/${id}`}>
      <Layout>
        <MainImage source={pictureUrl} alt={name} />
        <Bottom>
          <Title>{name}</Title>
          <Category>{category.name}</Category>
        </Bottom>
      </Layout>
    </Link>
  );
}

export default GameCard;
