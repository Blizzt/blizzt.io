// Dependencies
import React, { useImperativeHandle, useMemo, useState } from 'react';
import Loader from 'react-loader-spinner';

// Assets
import {
  CheckmarkSharp,
  CloseSharp
} from 'react-ionicons';

// Styled Components
import {
  Layout,
  Text,
  Icon,
  Element,
  Container
} from './styles';

import { common } from '@styled-components/common';

export const buttonTypesId = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DISABLED: 'disabled'
};

export const actionHandlers = {
  DEFAULT: 'default',
  LOADING: 'loading',
  COMPLETE: 'complete',
  ERROR: 'error'
};

const initialState = {
  state: actionHandlers.DEFAULT,
  text: null
};

function MainButton({
  caption,
  onClick = () => {},
  leftElement = null,
  rightElement = null,
  customStyleContainer = {},
  type = buttonTypesId.PRIMARY
}, ref) {
  // State
  const [{ state, text, handler = () => {} }, setActionState] = useState(initialState);

  useImperativeHandle(ref, () => ({
    changeToDefault: () => {
      setActionState({
        state: actionHandlers.DEFAULT,
        text: null
      });
    },
    changeToComplete: (text, handler = () => {}) => {
      setActionState({
        state: actionHandlers.COMPLETE,
        text,
        handler
      });
    },
    changeToLoading: (text) => {
      setActionState({
        state: actionHandlers.LOADING,
        text
      });
    },
    changeToError: (text) => {
      setActionState({
        state: actionHandlers.ERROR,
        text
      });
    }
  }));

  const renderButtonState = useMemo(() => {
    switch (state) {
      case actionHandlers.ERROR:
        return (
          <Container onAnimationEnd={() => {
            setActionState(initialState);
          }}>
            <CloseSharp
              width={'32px'}
              height={'32px'}
              color={common.colors.WHITE}
              style={{ paddingRight: '12px' }}
            />
            <Text>
              {text}
            </Text>
          </Container>
        );

      case actionHandlers.COMPLETE:
        return (
          <Container onAnimationEnd={() => {
            setActionState(initialState);
            handler();
          }}>
            <CheckmarkSharp
              width={'32px'}
              height={'32px'}
              color={common.colors.WHITE}
              style={{ paddingRight: '12px' }}
            />
            <Text>
              {text}
            </Text>
          </Container>
        );

      case actionHandlers.LOADING:
        return (
          <Container>
            <Loader
              width={22}
              type="Oval"
              height={22}
              color={common.colors.GRAY_HARD}
              style={{ paddingRight: '12px' }}
            />
            <Text>
              {text}
            </Text>
          </Container>
        );

      case actionHandlers.DEFAULT:
      default:
        return (
          <Container>
            {leftElement && (
              typeof leftElement === 'string' ? <Icon left src={leftElement} /> : <Element left>{leftElement}</Element>
            )}
            <Text>
              {caption}
            </Text>
            {rightElement && (
              typeof rightElement === 'string' ? <Icon src={rightElement} /> : <Element>{rightElement}</Element>
            )}
          </Container>
        );
    }
  }, [state, text, handler]);

  return (
    <Layout
      type={'button'}
      actionState={state}
      classType={type}
      disabled={type === buttonTypesId.DISABLED || state !== actionHandlers.DEFAULT}
      style={customStyleContainer}
      onClick={onClick}
    >
      {renderButtonState}
    </Layout>
  );
}

export default React.forwardRef(MainButton);
