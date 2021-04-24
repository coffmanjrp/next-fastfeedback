import React from 'react';
import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex pb={8} pt={24} justify="center" backgroundColor="gray.100">
      <NextLink href="/privacy" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Privacy
        </Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Terms
        </Link>
      </NextLink>
      <NextLink href="/docs" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Docs
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Home
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Footer;
