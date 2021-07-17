// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Container
} from './styles';

function FormFooter({
  actions = []
}) {
  return (
		<Layout>
			<Container>
				{actions.map(action => action)}
			</Container>
		</Layout>
  );
}

export default FormFooter;
