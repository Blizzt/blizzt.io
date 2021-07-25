// Dependencies
import React from 'react';

// Assets
import {
  NewspaperOutline,
  DiceOutline,
  ImagesOutline,
  MegaphoneOutline,
  InformationCircleOutline
} from 'react-ionicons';

export const sectionTypesId = {
  BIO: 'bio',
  DETAILS: 'details',
  COLLECTIBLES: 'collectibles',
  NEWS: 'news',
  GALLERY: 'gallery'
};

export const sectionList = [
  {
    id: sectionTypesId.BIO,
    path: '',
    label: 'Paper',
    icon: (
      <NewspaperOutline
        width={'20px'}
        height={'20px'}
      />
    )
  },

  {
    id: sectionTypesId.DETAILS,
    path: '/details',
    label: 'Project Details',
    icon: (
      <InformationCircleOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },

  {
    id: sectionTypesId.COLLECTIBLES,
    label: 'Collectibles',
    path: '/collectibles',
    icon: (
      <DiceOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },
  {
    id: sectionTypesId.NEWS,
    label: 'Latest news',
    icon: (
      <MegaphoneOutline
        width={'20px'}
        height={'20px'}
      />
    )
  },
  {
    id: sectionTypesId.GALLERY,
    label: 'Photos & Videos',
    icon: (
      <ImagesOutline
        width={'20px'}
        height={'20px'}
      />
    )
  }
];
