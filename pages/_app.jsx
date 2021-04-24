import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { MDXProvider } from '@mdx-js/react';
import { AuthProvider } from '@/lib/auth';
import MDXComponents from '@/components/MDXComponents';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <GlobalStyle />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
