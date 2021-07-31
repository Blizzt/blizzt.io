// Dependencies
import React from 'react';
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

// Utils
import { shortenDescription } from '@utils/string';
import { Medium } from '@styled-components/text';

function ProjectCard({
  path,
  title,
  photoUrl,
  category,
  description,
  collectiblesCount,
  collectiblesSold
}) {
  return (
  	<Link href={path}>
			<Layout>
				<MainImage source={photoUrl} />
				<Content>
					<Data>
						<Category>{category.label}</Category>
						<Title>{title}</Title>
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
