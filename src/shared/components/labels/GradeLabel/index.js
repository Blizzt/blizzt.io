// Dependencies
import React, { useMemo } from 'react';

// Utils
import { getCollectibleGrade } from '@utils/collectibles';

// Styles
import { Grade } from './styles';

function GradeLabel({ mintedAmount = 0, customStyleContainer = {} }) {
  const renderItemGrade = useMemo(() => {
    const grade = getCollectibleGrade(mintedAmount);
    return (
			<Grade color={grade.color} style={customStyleContainer}>
				{grade.name}
			</Grade>
    );
  }, [mintedAmount]);

  return renderItemGrade;
}

export default GradeLabel;
