import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Flex, Text, Stack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';
import { GitHubIcon, GoogleIcon } from '@/utils/customIcons';

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
      <Text mb={4} px={8} fontSize="lg" fontWeight="bold">
        Fast Feedback
      </Text>
      {auth.user ? (
        <NextLink href="/dashboard" passHref>
          <Button
            as="a"
            size="lg"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
          >
            View Dashboard
          </Button>
        </NextLink>
      ) : (
        <Stack mt={4}>
          <Button
            leftIcon={<GitHubIcon />}
            size="lg"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
            onClick={() => auth.signinWithGitHub()}
          >
            Sign in with GitHub
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            size="lg"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
            onClick={() => auth.signinWithGoogle()}
          >
            Sign in with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Home;
