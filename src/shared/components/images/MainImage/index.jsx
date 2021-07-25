// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Source
} from './styles';

// Types
import { imageAspectRatio } from '@types/images';

function MainImage({
  alt,
  source,
  radius = 0,
  aspectRatio = imageAspectRatio.SIXTEEN
}, ref) {
  return (
		<Layout aspectRatio={aspectRatio} radius={radius}>
			<Source ref={ref} alt={alt} src={source} width={2} height={2} />
		</Layout>
  );
}

export default React.forwardRef(MainImage);
