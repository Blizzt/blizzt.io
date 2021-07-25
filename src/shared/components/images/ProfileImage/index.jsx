// Dependencies
import React from 'react';
import Blockies from 'react-blockies-image';

// Styled Components
import {
  Layout,
  Source
} from './styles';
import { common } from '@styled-components/common';

// Types
import { imageAspectRatio } from '@types/images';

function ProfileImage({
  alt,
  size,
  address,
  radius = null,
  source = null,
  aspectRatio = imageAspectRatio.SIXTEEN
}, ref) {
  return (
    <Layout aspectRatio={aspectRatio} radius={radius ?? size}>
      {source ? (
        <Source
          ref={ref}
          alt={alt}
          width={'100%'}
          height={'100%'}
          src={source}
        />
      ) : (
        <Blockies
          seed={address}
          size={10}
          color={common.colors.PRIMARY_LIGHT}
          bgColor={common.colors.PRIMARY}
          spotColor={common.colors.PRIMARY}
        />
      )}
    </Layout>
  );
}

export default React.forwardRef(ProfileImage);
