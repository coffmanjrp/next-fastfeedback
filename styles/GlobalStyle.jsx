import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  );
};

export default GlobalStyle;
