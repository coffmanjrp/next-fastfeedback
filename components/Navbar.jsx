import React from 'react';
import NextLink from 'next/link';
import { Flex, HStack, Link, Avatar } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';

const Navbar = () => {
  const { user } = useAuth();

  return (
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
        <HStack spacing={4} alignItems="center">
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon color="black" fontSize="24px" mt="-1px" />
            </Link>
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link mr={4}>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </HStack>
        <HStack spacing={4} alignItems="center">
          {user && (
            <NextLink href="/account" passHref>
              <Link>Account</Link>
            </NextLink>
          )}
          <Avatar size="sm" src={user && user.photoUrl} />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
