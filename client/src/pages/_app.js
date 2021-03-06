import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import RootStore from '../stores/stores.jsx';
import theme from '../theme.js';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <title>ERP</title>
      </Head>
      <RootStore {...pageProps}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              initialColorMode: 'light',
              useSystemColorMode: false,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <div suppressHydrationWarning>
                {typeof window === 'undefined' ? null : <Component {...pageProps} />}
              </div>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </RootStore>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
