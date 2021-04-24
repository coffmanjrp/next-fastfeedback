import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardShell = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;
  const name = path.charAt(1).toUpperCase() + path.slice(2);
  const title = `FastFeedback - ${name}`;
  const url = `http://localhost:3000${path}`;

  return (
    <>
      <NextSeo title={title} canonical={url} openGraph={{ url, title }} />
      <Box backgroundColor="gray.100">
        <Navbar />
        <Flex p={8} h="100vh">
          <Flex maxWidth="1150px" direction="column" w="full" m="0 auto">
            {children}
          </Flex>
        </Flex>
        <Footer />
      </Box>
    </>
  );
};

export default DashboardShell;
