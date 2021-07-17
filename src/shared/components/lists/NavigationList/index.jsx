// Dependencies
import React from 'react';

// Components
import ActiveLink from '@components/links/ActiveLink';

// Styled Components
import {
  List,
  Item,
  Label,
  Icon
} from './styles';

function NavigationList({ customStyleContainer = {}, data = [], baseUrl = '/' }, ref) {
  return (
  	<List ref={ref} columns={data.length} style={customStyleContainer}>
			{data.map((item, index) => (
        <ActiveLink
          activeClassName={'selected'}
          key={`--section-item-key-${index.toString()}`}
          href={`${baseUrl}${item.path}`}
        >
          <Item>
            {item.icon && <Icon>{item.icon}</Icon>}
            <Label>{item.label}</Label>
          </Item>
        </ActiveLink>
			))}
		</List>
  );
}

export default React.forwardRef(NavigationList);
