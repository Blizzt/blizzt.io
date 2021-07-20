// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Source
} from './styles';
import { imageAspectRatio } from '@types/images';

function MainImage({
  source,
  aspectRatio = imageAspectRatio.SIXTEEN,
  radius = 0,
  alt
}, ref) {
  return (
		<Layout aspectRatio={aspectRatio} radius={radius}>
			<Source ref={ref} alt={alt} src={source} width={2} height={2} />
		</Layout>
  );
}

export default React.forwardRef(MainImage);
