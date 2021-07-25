// Dependencies
import React from 'react';
import NumberFormat from 'react-number-format';

// Styled Components
import {
  Layout,
  Current,
  Max,
  Data,
  Block,
  Bottom
} from './styles';

function FundingIndicator({
  current,
  max,
  icon,
  customStyleContainer = {},
  bottom = null
}) {
  return (
    <Layout style={customStyleContainer}>
      <Block>
        {icon && icon}
        <Data>
          <NumberFormat
            value={current}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={value => (
              <Current>
                {value}
              </Current>
            )}
          />
          <Max>
            Contributed of {' '}
            <NumberFormat
              value={max}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Max>
        </Data>
      </Block>
      {bottom && <Bottom>{bottom}</Bottom>}
    </Layout>
  );
}

export default FundingIndicator;
