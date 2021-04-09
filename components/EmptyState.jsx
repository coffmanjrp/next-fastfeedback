import React from 'react';
import { Heading, Text, Button, Flex } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <DashboardShell>
    <Flex
      backgroundColor="white"
      borderRadius="4px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading as="h2" size="lg" mb={2}>
        You haven't added any sites.
      </Heading>
      <Text mb={4}>Welcome 👋 Let's get started.</Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
);

export default EmptyState;
