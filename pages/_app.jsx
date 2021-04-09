import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
