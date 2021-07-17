// Dependencies
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Assets
import {
  ChevronDownOutline
} from 'react-ionicons';

// Styled Components
import {
  Layout,
  Header,
  Container,
  Title,
  ToggleButton,
  Icon,
  ArrowIcon
} from './styles';

function Collapsible({ children, title, icon, defaultCollapsed = true }) {
  // Ref
  const container = useRef(null);

  // State
  const [isCollapsed, setCollapsed] = useState(defaultCollapsed);
  const [originalHeight, setOriginalHeight] = useState(null);

  useEffect(() => {
  	if (container.current) {
      setOriginalHeight(container.current.offsetHeight);
    }
  }, [container]);

  const toggleCollapse = useCallback(() => {
    setCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const isReady = useMemo(() => (
  	typeof originalHeight === 'number'
  ), [originalHeight]);

  return (
		<Layout isCollapsed={isCollapsed} originalHeight={originalHeight} visible={isReady}>
			<Header onClick={toggleCollapse}>
				<Title>
					{icon && (
						<Icon>
							{icon}
						</Icon>
					)}
					{title}
				</Title>
				<ToggleButton>
					<ArrowIcon>
						<ChevronDownOutline
							width={'12px'}
							height={'12px'}
						/>
					</ArrowIcon>
				</ToggleButton>
			</Header>
			<Container ref={container}>
				<div style={{ padding: '12px' }}>
					{children}
				</div>
			</Container>
		</Layout>
  );
}

export default Collapsible;
