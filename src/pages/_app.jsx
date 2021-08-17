// Dependencies
import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { CookiesProvider } from 'react-cookie';
import { appWithTranslation } from 'next-i18next';

// Styled Theme
import { StyledThemeProvider } from '@styled-components/index';

// Application Layout
import AppLayout from '@layouts/AppLayout';

// Global Imports
import '@styled-components/platform-base.css';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-image-crop/dist/ReactCrop.css';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <StyledThemeProvider>
      <CookiesProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Web3ReactProvider>
      </CookiesProvider>
    </StyledThemeProvider>
  );
}

export default appWithTranslation(MyApp);
