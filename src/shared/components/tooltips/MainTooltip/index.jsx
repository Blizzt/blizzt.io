// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  AlertView
} from './styles';

function MainTooltip({
  children,
  customContainerStyle = {},
  customArrowStyle = {},
  component = null
}) {
  return (
		<Layout>
			<AlertView
				customContainerStyle={customContainerStyle}
				customArrowStyle={customArrowStyle}
			>
				{component}
			</AlertView>
			{children}
		</Layout>
  );
}

export default MainTooltip;
