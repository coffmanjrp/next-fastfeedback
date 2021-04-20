import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

const FeedbackLink = ({ paths }) => {
  return (
    <Flex
      direction={['column', 'row']}
      justify="space-between"
      align={['flex-start', 'center']}
      mb={8}
      w="full"
      mt={1}
    >
      <Link
        href={`/site/${paths}`}
        target="_blank"
        fontWeight="bold"
        fontSize="sm"
      >
        Leave a comment →
      </Link>
      <Link href="/" target="_blank" fontSize="xs" color="gray.500">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
};

export default FeedbackLink;
