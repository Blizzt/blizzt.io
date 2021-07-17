// Dependencies
import React from 'react';

// Assets
import {
  NewspaperOutline,
  DiceOutline
} from 'react-ionicons';

export const sectionTypesId = {
  BIO: 'bio',
  COLLECTIBLES: 'collectibles',
  NEWS: 'news',
  GALLERY: 'gallery',
  ANALYTICS: 'analytics'
};

export const sectionList = [
  {
    id: sectionTypesId.BIO,
    path: '',
    label: 'Information',
    icon: (
      <NewspaperOutline
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
  }
/*
  {
    id: sectionTypesId.NEWS,
    label: 'News',
    icon: (
      <MegaphoneOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },
  {
    id: sectionTypesId.GALLERY,
    label: 'Photos & Videos',
    icon: (
      <ImagesOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },
  {
    id: sectionTypesId.ANALYTICS,
    label: 'Analytics',
    icon: (
      <AnalyticsOutline
        width={'22px'}
        height={'22px'}
      />
    )
  } */
];
