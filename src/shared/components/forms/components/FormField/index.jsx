// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Label,
  Container
} from './styles';

const MemorizedParagraph = React.memo(({ paragraph }) => paragraph);

function FormField({
  label,
  paragraphs = []
}) {
  return (
		<Layout>
			<Label>{label}</Label>
			<Container>
				{paragraphs.map((paragraph, index) => (
					<MemorizedParagraph
						key={`--fields-key-${index.toString()}`}
						paragraph={paragraph}
					/>
				))}
			</Container>
		</Layout>
  );
}

export default FormField;
