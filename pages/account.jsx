import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Avatar,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Badge,
  HStack,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import SettingsTable from '@/components/SettingsTable';
import FeedbackUsage from '@/components/FeedbackUsage';
import fetcher from '@/utils/fetcher';

const Account = () => {
  const { user, signout } = useAuth();
  // const { data } = useSWR(user ? ['/api/user', user.token] : null, fetcher);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        m="0 auto"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            mb={4}
            src={user && user.photoUrl}
          />
          <Heading letterSpacing="-1px">{user && user.name}</Heading>
          <Text>{user && user.email}</Text>
        </Flex>
      </Flex>
      <SettingsTable stripeRole={'Free'}>
        <FeedbackUsage />
        <Text my={4}>
          Fast Feedback uses Stripe to update, change, or cancel your
          subscription. You can also update card information and billing
          addresses through the secure portal.
        </Text>
        <Flex justify="flex-end">
          <Button variant="ghost" mr={2} onClick={() => signout()}>
            Log out
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
          {/* <Button
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
          </Button> */}
        </Flex>
      </SettingsTable>
    </DashboardShell>
  );
};

export default Account;
