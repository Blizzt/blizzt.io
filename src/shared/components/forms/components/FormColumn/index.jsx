// Dependencies
import React from 'react';

// Styled Components
import { Block, Column, Field, Paragraph, Title } from './styles';

// Memorized Components
const MemorizedField = React.memo(({ field }) => (
	<Field>
		{field}
	</Field>
));

const MemorizedParagraph = React.memo(({ paragraph }) => (
	<Paragraph>{paragraph}</Paragraph>
));

function FormColumn({
  title,
  vertical = false,
  paragraphs = [],
  fields = [],
  separator = true
}) {
  return (
		<Column vertical={vertical} separator={separator}>
			<Block>
				<Field>
					<Title>{title}</Title>
					{paragraphs.map((paragraph, index) => (
						<MemorizedParagraph
							key={`--fields-key-${index.toString()}`}
							paragraph={paragraph}
						/>
					))}
				</Field>
			</Block>
			<Block>
				{fields.map((field, index) => (
					<MemorizedField
						key={`--fields-key-${index.toString()}`}
						field={field}
					/>
				))}
			</Block>
		</Column>
  );
}

export default FormColumn;
