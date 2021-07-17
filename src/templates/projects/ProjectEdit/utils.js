// Dependencies
import React from 'react';

// Assets
import {
  NewspaperOutline,
  DiceOutline,
  OptionsOutline,
  MegaphoneOutline
} from 'react-ionicons';

export const sectionTypesId = {
  BASIC: 'basic',
  REWARDS: 'collectibles',
  STORY: 'story',
  PROMO: 'promotion'
};

export const sectionList = [
  {
    id: sectionTypesId.STORY,
    name: 'Information',
    path: '',
    icon: (
      <NewspaperOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },

  {
    id: sectionTypesId.REWARDS,
    name: 'Collectibles',
    path: '/collectibles',
    icon: (
      <DiceOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },

  {
    id: sectionTypesId.BASIC,
    name: 'Projects Details',
    path: '/details',
    icon: (
      <OptionsOutline
        width={'22px'}
        height={'22px'}
      />
    )
  },

  {
    id: sectionTypesId.PROMO,
    name: 'Promotion',
    path: '/promotion',
    icon: (
      <MegaphoneOutline
        width={'22px'}
        height={'22px'}
      />
    )
  }
];
