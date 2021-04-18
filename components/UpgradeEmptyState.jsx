import React, { useState } from 'react';
import { Heading, Text, Flex, Button } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/db';

const UpgradeEmptyState = () => {
  const { user } = useAuth();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  return (
    <Flex
      backgroundColor="white"
      borderRadius="4px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading as="h2" size="lg" mb={2}>
        Get feedback on your site instantly
      </Heading>
      <Text mb={4}>Start today, then grow with us 🌱</Text>
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
    </Flex>
  );
};

export default UpgradeEmptyState;
