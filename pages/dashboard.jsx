import React from 'react';
import Head from 'next/head';
import { Heading, Button, Text, Code, Box, Flex } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';
import EmptyState from '@/components/EmptyState';
import FreePlanEmptyState from '@/components/FreePlanEmptyState';

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
};

export default Dashboard;
