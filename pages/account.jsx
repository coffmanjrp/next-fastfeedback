import React, { useState } from 'react';
import useSWR from 'swr';
import { Button, HStack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';

const Account = () => {
  const { user, signout } = useAuth();
  // const { data } = useSWR(user ? ['/api/user', user.token] : null, fetcher);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

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
          isLoading={isCheckoutLoading}
          onClick={() => {
            setIsCheckoutLoading(true);
            createCheckoutSession(user.uid);
          }}
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
          isLoading={isBillingLoading}
          onClick={() => {
            setIsBillingLoading(true);
            goToBillingPortal();
          }}
        >
          View Billing Portal
        </Button>
        <Button variant="ghost" mr={2} onClick={() => signout()}>
          Log out
        </Button>
      </HStack>
    </DashboardShell>
  );
};

export default Account;
