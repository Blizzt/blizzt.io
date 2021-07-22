// Dependencies
import React from 'react';
import Carrousel from 'react-multi-carousel';

// Styled Components
import {
  Item,
  Title
} from './styles';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function HorizontalGallery({ title, renderItem = () => {}, data = [] }) {
  return (
    <>
      <Title>{title}</Title>
      <Carrousel
        ssr
        swipeable={false}
        deviceType={'desktop'}
        responsive={responsive}>
        {data.map((props, index) => (
          <Item key={`--carrousel-item-key-${index}`}>
            {renderItem(props)}
          </Item>
        ))}
      </Carrousel>
    </>
  );
}

export default HorizontalGallery;
