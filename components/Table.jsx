import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const Th = (props) => {
  return (
    <Text
      as="th"
      textTransform="uppercase"
      fontSize="gray.500"
      fontWeight="medium"
      px={4}
      {...props}
    />
  );
};

export const Td = (props) => {
  return (
    <Box
      as="td"
      fontSize="gray.900"
      p={4}
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      {...props}
    />
  );
};

export const Tr = (props) => {
  return (
    <Box
      as="tr"
      backgroundColor="gray.50"
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      fontSize="gray.900"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      height="40px"
      {...props}
    />
  );
};

export const Table = (props) => {
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      mx={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
      {...props}
    />
  );
};
