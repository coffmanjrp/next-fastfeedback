import React, { useState } from 'react';
import { mutate } from 'swr';
import { Box, Code, Switch } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';
import { Td } from './Table';
import RemoveButton from './RemoveButton';

const FeedbackTable = ({ id, status, text, author, route }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === 'active');

  const toggleFeedback = () => {
    setChecked(!checked);
    updateFeedback(id, { status: !checked ? 'active' : 'pending' });
    mutate(['/api/feedback', auth.user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          variantColor="green"
          isChecked={checked}
          onChange={toggleFeedback}
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackTable;
