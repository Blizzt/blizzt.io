// Dependencies
import React, { useCallback, useState } from 'react';

// Styled-Components
import {
  Layout,
  Button
} from './styles';

function MainToggle({
  initialActiveIndex = 0,
  elements = [],
  onClickOption = () => {}
}) {
  // States
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  /**
	 * @function handleClickOption():
	 * @description Function that interacts with the options.
	 */
  const handleClickOption = useCallback((index, value) => {
    setActiveIndex(index);
    onClickOption(value);
  }, []);

  return (
		<Layout>
			{elements.map((element, index) => (
				<Button
          type={'button'}
					key={`--element-key-${index.toString()}`}
					onClick={() => handleClickOption(index, element.value)}
					isActive={activeIndex === index}
				>
					{element.icon}
				</Button>
			))}
		</Layout>
  );
}

export default MainToggle;
