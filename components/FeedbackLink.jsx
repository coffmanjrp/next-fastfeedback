import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

const FeedbackLink = ({ siteId }) => {
  return (
    <Flex justify="space-between" mb={8} w="full" mt={1}>
      <Link href={`/p/${siteId}`} fontWeight="bold" fontSize="sm">
        Leave a comment
      </Link>
      <Link href="/" fontSize="xs" color="blackAlpha.500">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
};

export default FeedbackLink;
