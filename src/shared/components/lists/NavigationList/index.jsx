// Dependencies
import React from 'react';

// Components
import ActiveLink from '@components/links/ActiveLink';

// Styled Components
import {
  Layout,
  List,
  ListItem,
  Item,
  Label,
  Icon,
  Title
} from './styles';

function NavigationList({
  title = null,
  customStyleContainer = {},
  data = [],
  baseUrl = '/'
}, ref) {
  return (
    <Layout style={customStyleContainer}>
      {title && (<Title>{title}</Title>)}
      <List ref={ref} columns={data.length}>
        {data.map((item, index) => (
          <ListItem key={`--section-item-key-${index.toString()}`}>
            <ActiveLink
              activeClassName={'selected'}
              href={`${baseUrl}${item.path}`}>
              <Item>
                {item.icon && <Icon>{item.icon}</Icon>}
                <Label>{item.label}</Label>
              </Item>
            </ActiveLink>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}

export default React.forwardRef(NavigationList);
