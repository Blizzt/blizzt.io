import { gradeTypesData, gradeTypesId } from '@types/collectible';

export const getCollectibleGrade = (amount) => {
  if (amount === 1) {
    return gradeTypesData[gradeTypesId.UNIQUE];
  } else if (amount >= 2 && amount <= 50) {
    return gradeTypesData[gradeTypesId.EXTREMELY_RARE];
  } else if (amount >= 51 && amount <= 100) {
    return gradeTypesData[gradeTypesId.VERY_RARE];
  } else if (amount >= 100 && amount <= 200) {
    return gradeTypesData[gradeTypesId.RARE];
  } else if (amount >= 200 && amount <= 5000) {
    return gradeTypesData[gradeTypesId.UNCOMMON];
  } else {
    return gradeTypesData[gradeTypesId.BASIC];
  }
};
