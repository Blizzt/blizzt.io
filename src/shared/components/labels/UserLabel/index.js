// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Picture,
  Username
} from './styles';

// Components
import MainImage from '@components/images/MainImage';

// Types
import { imageAspectRatio } from '@types/images';

function UserLabel({
  address,
  username,
  photoUrl = null,
  role
}) {
  return (
		<Layout>
      <Picture>
        <MainImage
          aspectRatio={imageAspectRatio.ONE}
          source={photoUrl}
          alt={username}
          radius={28}
        />
      </Picture>
      <Username role={role}>{username}</Username>
		</Layout>
  );
}

export default UserLabel;
