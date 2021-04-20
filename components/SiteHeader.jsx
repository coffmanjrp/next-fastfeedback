import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
} from '@chakra-ui/react';
import EditSiteModal from './EditSiteModal';

const SiteHeader = ({ site, siteId, route, isSiteOwner }) => {
  const siteName = site?.name;

  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink color="gray.700" fontSize="sm">
              Sites
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/site/${siteId}`} passHref>
            <BreadcrumbLink color="gray.700" fontSize="sm">
              {siteName || '-'}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {siteName && route && (
          <BreadcrumbItem>
            <NextLink href={`/site/${siteId}/${route}`} passHref>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                {route}
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading as="h1" mb={8}>
          {siteName || '-'}
        </Heading>
        {isSiteOwner && <EditSiteModal>Edit Site</EditSiteModal>}
      </Flex>
    </Box>
  );
};

export default SiteHeader;
