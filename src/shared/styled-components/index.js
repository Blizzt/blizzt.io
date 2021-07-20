// Dependencies
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

// Styling
import dark from './dark';
import light from './light';
import { uiThemeModeId } from '@types/ui';

export * from './common';

export const ThemeContext = React.createContext({
  theme: uiThemeModeId.LIGHT_MODE,
  toggle: () => undefined,
  modal: {
    id: null,
    data: null
  }
});

export const useTheme = () => {
  return React.useContext(ThemeContext); ;
};

export const StyledThemeProvider = ({ children }) => {
  // State
  const [theme, setTheme] = useState(uiThemeModeId.LIGHT_MODE);
  const [modal, setModal] = useState({
    id: null,
    data: null
  });

  const toggle = () => {
    setTheme((theme) => (theme === uiThemeModeId.DARK_MODE ? uiThemeModeId.DARK_MODE : uiThemeModeId.LIGHT_MODE));
  };

  const openModal = (id, data) => setModal({
    id,
    data
  });

  const closeModal = () => setModal({
    id: null,
    data: null
  });

  const values = React.useMemo(
    () => ({
      theme,
      modal,
      toggle,
      openModal,
      closeModal

    }),
    [toggle, openModal, closeModal, modal, theme]
  );

  return (
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={theme === uiThemeModeId.DARK_MODE ? dark : light}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
