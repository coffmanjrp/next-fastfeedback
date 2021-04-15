import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, Stack, Avatar, Button, Box } from '@chakra-ui/react';
import { LogoIcon } from '@/utils/customIcons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        mb={16}
        w="full"
        backgroundColor="white"
        borderTop="5px solid #0af5f4"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          m="0 auto"
          py={4}
          px={8}
          w="full"
          maxW="1250px"
          h="60px"
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
      </Flex>
      <Flex backgroundColor="gray.100" p={8} h="100vh">
        <Flex maxWidth="1150px" direction="column" w="full" m="0 auto">
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
