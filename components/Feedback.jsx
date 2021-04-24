import React from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Icon,
  Code,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { GitHubIcon, GoogleIcon } from '@/utils/customIcons';
import { useTheme } from '@/utils/useTheme';
import MDXComponents from './MDXComponents';

const Feedback = ({ author, text, createdAt, provider, settings, isLast }) => {
  const colorMode = useTheme();
  const authorColor = {
    light: 'gray.900',
    dark: 'gray.200',
  };
  const textColor = {
    light: 'gray.800',
    dark: 'gray.300',
  };
  const dividerColor = {
    light: 'gray.200',
    dark: 'gray.700',
  };

  return (
    <Box borderRadius={4} maxW="700px" w="full">
      <Flex align="center">
        <Heading
          as="h3"
          size="sm"
          mb={0}
          color="gray.900"
          fontWeight="medium"
          color={authorColor[colorMode]}
        >
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
      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          source={text}
          renderers={{
            paragraph: MDXComponents.p,
            blockquote: MDXComponents.blockquote,
            link: MDXComponents.a,
            list: MDXComponents.ul,
            listItem: MDXComponents.li,
            table: MDXComponents.table,
            tableHead: MDXComponents.th,
            tableCell: MDXComponents.td,
            code: ({ value }) => (
              <pre>
                <Code borderRadius={8} p={4} my={4}>
                  {value}
                </Code>
              </pre>
            ),
            inlineCode: MDXComponents.inlineCode,
          }}
        />
      </Box>

      {isLast && <Divider borderColor={dividerColor[colorMode]} my={6} />}
    </Box>
  );
};

export default Feedback;
