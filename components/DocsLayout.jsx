import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

const DocsLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box maxW="700px" mx="auto">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default DocsLayout;
