// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import { config, useSpring } from 'react-spring';

// Styled Components
import {
  Layout,
  Menu,
  Item,
  Text,
  Container,
  Section,
  Paragraph,
  Label,
  Flex
} from './styles';

// Assets
import {
  GameControllerOutline,
  VideocamOutline,
  DiceOutline,
  ColorWandOutline,
  ArrowForward
} from 'react-ionicons';

const menu = [
  {
    label: 'Games & Software',
    icon: (
      <GameControllerOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    sections: [
      {
        title: 'Seeking financing',
        paragraph: 'Find projects from independent studios and developers looking for funding to launch them.'
      },
      {
        title: 'Published Projects',
        paragraph: 'Find products that are already available but integrate our blockchain technology, so you can buy, sell, rent and exchange NFTs.'
      },
      {
        title: 'Highest Rated',
        paragraph: 'Discover the most popular projects in the community.'
      }
    ]
  },
  {
    label: 'Movies',
    icon: (
      <VideocamOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    sections: [
      {
        title: 'Seeking financing',
        paragraph: 'Films or series seeking financing through the purchase of NFTs.'
      },
      {
        title: 'Newly released',
        paragraph: 'Find collectibles of movies and series already published.'
      }
    ]
  },
  {
    label: 'Collectibles',
    icon: (
      <DiceOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    sections: [
      {
        title: 'Game items',
        paragraph: 'Find game items to buy, trade, rent and use whenever you want.'
      },
      {
        title: 'Emblems and chromos',
        paragraph: 'Discover valuable collectibles of digital products and streamers.'
      }
    ]
  },
  {
    label: 'Jobs',
    icon: (
      <ColorWandOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    sections: [
      {
        title: 'Hire profesionals',
        paragraph: 'Find professionals to help you carry out your projects.'
      },
      {
        title: 'Job offers',
        paragraph: 'Find job opportunities for companies and projects.'
      }
    ]
  }
];

function DiscoverMenu({ visible }, ref) {
  const boxView = useRef(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [boxWidth, setBoxWidth] = useState({ current: 0, next: 0 });
  const [boxHeight, setBoxHeight] = useState({ current: 0, next: 0 });

  useEffect(() => {
    if (boxView && boxView.current) {
      setBoxWidth(prevState => ({
        current: prevState.next,
        next: boxView.current.clientWidth
      }));

      setBoxHeight(prevState => ({
        current: prevState.next,
        next: boxView.current.clientHeight
      }));
    }
  }, [sectionIndex, boxView.current]);

  const animationState = useSpring({
    from: {
      width: boxWidth.current ? boxWidth.current : 'auto',
      height: boxHeight.current ? boxHeight.current : 'auto'
    },
    to: {
      width: boxWidth.next,
      height: boxHeight.next
    },
    config: config.stiff
  });

  return (
    <Layout style={{ ...animationState }} ref={ref}>
      <Flex ref={boxView}>
        <Menu>
          {menu.map((item, index) => (
            <Item
              key={`--discover-key-${index.toString()}`}
              selected={index === sectionIndex}
              onMouseEnter={() => setSectionIndex(index)}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </Item>
          ))}
        </Menu>
        <Container>
          {menu[sectionIndex].sections.map((section, index) => (
            <Section key={`--section-key-${index.toString()}`}>
              <Label>
                {section.title}
                <ArrowForward
                  width={'14px'}
                  height={'14px'}
                />
              </Label>
              <Paragraph>{section.paragraph}</Paragraph>
            </Section>
          ))}
        </Container>
      </Flex>
    </Layout>
  );
}

export default React.forwardRef(DiscoverMenu);
