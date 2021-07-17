// Dependencies
import React, { useMemo } from 'react';
import Link from 'next/link';

// Styled Components
import {
  Layout,
  Content,
  Category,
  Title,
  Description,
  Data,
  Footer
} from './styles';

// Components
import ProgressBarIndicator from '@components/indicators/ProgressBarIndicator';
import MainImage from '@components/images/MainImage';

// Types
import { categories } from '@types/categories';

// Utils
import { shortenDescription } from '@utils/string';
import { Medium } from '@styled-components/text';

function ProjectCard({
  path,
  name,
  photo,
  categoryId,
  description,
  collectiblesCount,
  collectiblesSold
}) {
  const category = useMemo(() => categories.filter(e => e.id === categoryId)[0], [categoryId]);

  return (
  	<Link href={path}>
			<Layout>
				<MainImage source={photo} />
				<Content>
					<Data>
						<Category>{category.label}</Category>
						<Title>{name}</Title>
						<Description>
							{shortenDescription(description, 136)}
							{description.length > 136 && (
								<Medium>Read more</Medium>
							)}
						</Description>
					</Data>
					<Footer>
						<ProgressBarIndicator
							max={collectiblesCount}
							current={collectiblesSold}
							label={(max, current) =>
							  !max ? 'No collectibles available' : `${current} NFT's sold out of ${max}`
							}
						/>
					</Footer>
				</Content>
			</Layout>
		</Link>
  );
}

export default ProjectCard;
