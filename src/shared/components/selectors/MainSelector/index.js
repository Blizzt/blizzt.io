// Dependencies
import React, { useCallback, useMemo, useState } from 'react';

// Styled Components
import {
  Layout,
  Label,
  Icon,
  List,
  Item,
  Input,
  Text,
  SelectedCheck,
  Container
} from './styles';

const selectorStatesId = {
  CLOSE: 'close',
  OPEN: 'open'
};

function MainSelector({
  items = [],
  onChange = () => {},
  selected = null
}) {
  const [currentState, setCurrentState] = useState(selectorStatesId.CLOSE);

  const onClickSelector = useCallback(() => {
  	if (currentState === selectorStatesId.OPEN) {
  		setCurrentState(selectorStatesId.CLOSE);
    } else {
      setCurrentState(selectorStatesId.OPEN);
    }
  }, [currentState]);

  const isSelectorOpen = useMemo(() => currentState === selectorStatesId.OPEN, [currentState]);

  const getSelectedLabel = useMemo(() => {
  	if (!selected) {
  		return 'Select your category';
    }
  	return items.find(e => e.id === selected).label;
  }, [selected]);

  const onClickItem = useCallback((item) => {
    onChange(item);
  	setCurrentState(selectorStatesId.CLOSE);
  }, [onChange]);

  return (
  	<Layout opened={isSelectorOpen}>
			<Input onClick={onClickSelector}>
				<Label>{getSelectedLabel}</Label>
				<Icon>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path fill='none' stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184l144 144 144-144'/>
					</svg>
				</Icon>
			</Input>
			<Container>
				<List>
					{items.map((item, index) => {
					  const isThisItemSelected = item.id === selected;
					  return (
							<Item
								key={`--mein-selector-item-${index.toString()}`}
								active={isThisItemSelected}
								onClick={() => onClickItem(item)}
							>
								<Text>{item.label}</Text>
								{isThisItemSelected && (
									<SelectedCheck>
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
											<path fill='none' stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 128L192 384l-96-96'/>
										</svg>
									</SelectedCheck>
								)}
							</Item>
					  );
					})}
				</List>
			</Container>
		</Layout>
  );
}

export default MainSelector;
