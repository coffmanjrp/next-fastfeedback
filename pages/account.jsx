import React from 'react';
import useSWR from 'swr';
import { Button, HStack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';

const Account = () => {
  const { user } = useAuth();
  // const { data } = useSWR(user ? ['/api/user', user.token] : null, fetcher);

  return (
    <DashboardShell>
      <HStack>
        <Button
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={(e) => createCheckoutSession(user.uid)}
        >
          Upgrade to Starter
        </Button>
        <Button
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={(e) => goToBillingPortal()}
        >
          View Billing Portal
        </Button>
      </HStack>
    </DashboardShell>
  );
};

export default Account;
