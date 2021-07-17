// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  List,
  Section,
  Title,
  Item,
  Label
} from './styles';

function SectionList({ data = [] }) {
  return (
  	<Layout>
			{data.map((section, index) => (
				<Section key={`--section-list-${index}`}>
					<Title>{section.label}</Title>
					<List>
						{section.items.map((item, index) => (
							<Item key={`--section-item-${index}`}>
								<Label>{item.label}</Label>
							</Item>
						))}
					</List>
				</Section>
			))}
		</Layout>
  );
}

export default SectionList;
