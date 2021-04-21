import React from 'react';
import { Box, Heading, Text, Divider, Flex, Icon } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { GitHubIcon, GoogleIcon } from '@/utils/customIcons';

const Feedback = ({ author, text, createdAt, provider, settings, isLast }) => {
  return (
    <Box borderRadius={4} maxW="700px" w="full">
      <Flex align="center">
        <Heading as="h3" size="sm" mb={0} color="gray.900" fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && (
          <Icon
            as={provider === 'google.com' ? GoogleIcon : GitHubIcon}
            size="13px"
            ml="6px"
          />
        )}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}

      <Text color="gray.800" my={4} p={4} borderRadius={8}>
        {text}
      </Text>
      {isLast && (
        <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} />
      )}
    </Box>
  );
};

export default Feedback;
