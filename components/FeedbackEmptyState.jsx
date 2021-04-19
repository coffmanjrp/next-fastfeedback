import React from 'react';
import { Heading, Text, Flex } from '@chakra-ui/react';

const FeedbackEmptyState = () => (
  <Flex
    backgroundColor="white"
    borderRadius="4px"
    p={16}
    justify="center"
    align="center"
    direction="column"
  >
    <Heading as="h2" size="lg" mb={2}>
      There isn't any feedback.
    </Heading>
    <Text mb={4}>Share your sites!</Text>
  </Flex>
);

export default FeedbackEmptyState;
