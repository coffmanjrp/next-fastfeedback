import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Box, Flex, Text, HStack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import { LogoIcon } from '@/utils/customIcons';
import { GitHubIcon, GoogleIcon } from '@/utils/customIcons';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback || [],
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback }) => {
  const auth = useAuth();

  return (
    <>
      <Box backgroundColor="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" m="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                      window.location.href = "/sites"
                    }
                  `,
              }}
            />
          </Head>

          <LogoIcon color="black" fontSize="42px" mb={2} />
          <Text mb={4} fontSize="lg">
            <Text as="span" fontWeight="bold">
              Fast Feedback
            </Text>{' '}
            is the easiest way to add comments or reviews to your static site.
            It's still a work-in-progress, but you can try it out by logging in.
          </Text>
          {auth.user ? (
            <NextLink href="/sites" passHref>
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
            <HStack mt={4}>
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
            </HStack>
          )}
        </Flex>
      </Box>
      <Flex
        flexDirection="column"
        w="full"
        maxW="700px"
        m="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
