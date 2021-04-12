import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, Stack, Avatar, Button } from '@chakra-ui/react';
import { LogoIcon } from '@/utils/customIcons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={8}
        w="full"
        h="70px"
        m="0 auto"
        maxW="1250px"
      >
        <Stack spacing={4} isInline alignItems="center">
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon color="black" fontSize="24px" mt="-1px" />
            </Link>
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link mr={4}>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={() => signout()}>
              Log out
            </Button>
          )}
          <Avatar size="sm" src={user && user.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} h="100vh">
        <Flex maxWidth="980px" direction="column" width="100%" m="0 auto">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
