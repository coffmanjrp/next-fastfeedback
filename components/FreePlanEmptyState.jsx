import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box backgroundColor="white" borderRadius="4px" p={8} height="100%">
      <Heading size="md" as="h2">
        Get feedback on your site instantly.
      </Heading>
      <Text>Start today, then grow with us 🌱</Text>
      <Button variant="solid" size="md">
        Upgrade to Starter
      </Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
