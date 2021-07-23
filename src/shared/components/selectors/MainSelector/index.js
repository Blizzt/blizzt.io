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

const MemorizedItem = React.memo(({ selected, item, onClick = () => {} }) => (
  <Item
    active={selected}
    onClick={() => onClick(item)}
  >
    <Text>{item.name}</Text>
    {selected && (
      <SelectedCheck>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path fill='none' stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 128L192 384l-96-96'/>
        </svg>
      </SelectedCheck>
    )}
  </Item>
), (prevProps, nextProps) => prevProps.selected !== nextProps.selected);

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
  	return items.find(e => e.id === selected).name;
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
							<MemorizedItem
                key={`--mein-selector-item-${index.toString()}`}
                item={item}
                onClick={onClickItem}
                selected={isThisItemSelected}
              />
					  );
					})}
				</List>
			</Container>
		</Layout>
  );
}

export default MainSelector;
