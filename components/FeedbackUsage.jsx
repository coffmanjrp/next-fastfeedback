import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from '@chakra-ui/react';

const FeedbackUsage = () => {
  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.700">Feedback</StatLabel>
        <StatNumber fontWeight="medium">∞</StatNumber>
        <StatHelpText>10,000 limit</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel color="gray.700">Sites</StatLabel>
        <StatNumber fontWeight="medium">1/∞</StatNumber>
        <StatHelpText>Unlimited Sites</StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default FeedbackUsage;
