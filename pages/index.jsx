import React from 'react';
import Head from 'next/head';
import { Heading, Button, Text, Code, Box, Flex } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';
import EmptyState from '@/components/EmptyState';
import FreePlanEmptyState from '@/components/FreePlanEmptyState';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon color="black" fontSize="64px" />
      {auth.user ? (
        <Button onClick={(e) => auth.signout()}>Sign Out</Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
