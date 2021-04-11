import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="400px"
      m="0 auto"
    >
      <Head>
        <title>Fast Feedback</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <LogoIcon color="black" fontSize="42px" mb={2} />
      <Text mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
      </Text>
      {auth.user ? (
        <NextLink href="/dashboard" passHref>
          <Button as="a">View Dashboard</Button>
        </NextLink>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
          Log In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
