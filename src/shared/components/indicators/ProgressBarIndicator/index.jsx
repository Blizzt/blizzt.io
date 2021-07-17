// Dependencies
import React, { useMemo } from 'react';

// Assets
import {
  DiceOutline
} from 'react-ionicons';

// Styled Components
import {
  Layout,
  Base,
  Value,
  Block,
  Label,
  Icon
} from './styles';
import { common } from '@styled-components/common';

function ProgressBarIndicator({
  max = 50,
  current = 25,
  label = () => {}
}) {
  const isEmpty = useMemo(() => (
    max === 0
  ), [max]);

  const percentage = useMemo(() => (
    current / max * 100
  ), [max, current]);

  const value = label(max, current);

  return (
    <Layout>
      {(label && typeof label === 'function') && (
        <Block>
          <Icon>
            <DiceOutline
              width={'22px'}
              height={'22px'}
              color={common.colors.PRIMARY}
            />
          </Icon>
          <Label>
            {value}
          </Label>
        </Block>
      )}
      <Base isEmpty={isEmpty}>
        <Value width={isNaN(percentage) ? 0 : percentage} />
      </Base>
    </Layout>
  );
}

export default ProgressBarIndicator;
