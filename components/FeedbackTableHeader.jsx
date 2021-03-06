import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';

const FeedbackTableHeader = ({ siteName }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink color="gray.700" fontSize="sm">
              Feedback
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading as="h1" mb={8}>
          {siteName || '-'}
        </Heading>
      </Flex>
    </>
  );
};

export default FeedbackTableHeader;
