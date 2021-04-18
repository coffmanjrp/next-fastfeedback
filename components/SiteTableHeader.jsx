import React from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({ isPaidAccount }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading as="h1" mb={8}>
          My Sites
        </Heading>
        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </>
  );
};

export default SiteTableHeader;
