// Dependencies
import React, { useEffect, useState } from 'react';
import { useColor } from 'color-thief-react';
import TinyColor from 'tinycolor2';

// Styled Components
import {
  Item,
  Layout,
  List,
  Bottom,
  Title,
  Platforms,
  Platform,
  Description
} from './styles';
import { act } from 'react-dom/test-utils';
;

const mock = [
  {
    id: '1',
    title: 'Need for Speed: Heat',
    photo: require('./example/1.png'),
    description: 'Need for Speed Heat is a racing game set in an open world environment called Palm City, a fictionalised version of the city Miami, Florida and its surrounding area.',
    googlePlayUrl: true,
    appleStoreUrl: true,
    steamUrl: true,
    playstationUrl: true,
    xboxUrl: true
  },
  {
    id: '2',
    title: 'The Elder Scrolls V: Skyrim',
    photo: require('./example/2.jpg'),
    description: 'Need for Speed Heat is a racing game set in an open world environment called Palm City, a fictionalised version of the city Miami, Florida and its surrounding area.',
    googlePlayUrl: true,
    appleStoreUrl: true,
    steamUrl: true,
    playstationUrl: true,
    xboxUrl: true
  },
  {
    id: '3',
    title: 'Call of Duty: Modern Warfare 2',
    photo: require('./example/3.jpg'),
    description: 'Need for Speed Heat is a racing game set in an open world environment called Palm City, a fictionalised version of the city Miami, Florida and its surrounding area.',
    googlePlayUrl: true,
    appleStoreUrl: true,
    steamUrl: true,
    playstationUrl: true,
    xboxUrl: true
  },
  {
    id: '4',
    title: 'Planet Zoo',
    photo: require('./example/4.jpg'),
    description: 'Need for Speed Heat is a racing game set in an open world environment called Palm City, a fictionalised version of the city Miami, Florida and its surrounding area.',
    googlePlayUrl: true,
    appleStoreUrl: true,
    steamUrl: true,
    playstationUrl: true,
    xboxUrl: true
  }
];

function GalleryItem({ item, isActive, onClick = () => {} }) {
  const { data: color, loading: isColorLoading } = useColor(item.photo, 'hex');

  if (isColorLoading) {
    return null;
  }

  return (
    <Item
      image={item.photo}
      isActive={isActive}
      onClick={onClick}
      accentColor={color}
      textColor={TinyColor(color).getBrightness() >= 150 ? '#000' : '#FFF' }
    >
      <Bottom>
        <Title>{item.title}</Title>
      </Bottom>
    </Item>
  );
}

function Gallery({ onChangeActive = () => {} }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    onChangeActive(mock[active]);
  }, [active]);

  return (
    <Layout>
      <Item primary={true} image={mock[active].photo}>
        <Bottom>
          <Title>{mock[active].title}</Title>
          <Description>{mock[active].description}</Description>
          <Platforms>
            <Platform>Android</Platform>
            <Platform>iOS</Platform>
            <Platform>PC</Platform>
            <Platform>PlayStation</Platform>
            <Platform>XBOX</Platform>
          </Platforms>
        </Bottom>
      </Item>
      <List>
        {mock.map((item, indexOfItem) => (
          <GalleryItem
            key={`--gallery-item-${indexOfItem.toString()}`}
            item={item}
            isActive={active === indexOfItem}
            onClick={() => setActive(indexOfItem)}
          />
        ))}
      </List>
    </Layout>
  );
}

export default Gallery;
