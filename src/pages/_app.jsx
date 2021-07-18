// Dependencies
import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { CookiesProvider } from 'react-cookie';
import { SWRConfig } from 'swr';

// Styled Theme
import { StyledThemeProvider } from '@styled-components/index';

// i18Next Translations
import { appWithTranslation } from '@i18n/index';

// Application Layout
import AppLayout from '@layouts/AppLayout';

// Global Imports
import '@styled-components/platform-base.css';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';

// FetchAPI
import { fetcherAPI } from '@utils/api';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <StyledThemeProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: fetcherAPI
        }}
      >
        <CookiesProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
          </Web3ReactProvider>
        </CookiesProvider>
      </SWRConfig>
    </StyledThemeProvider>
  );
}

export default appWithTranslation(MyApp);