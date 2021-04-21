import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import Feedback from '@/components/Feedback';
import SiteHeader from '@/components/SiteHeader';
import fetcher from '@/utils/fetcher';

const SiteFeedback = () => {
  const inputEl = useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}/`;
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'active',
    };

    inputEl.current.value = '';
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };

  return (
    <DashboardShell>
      <SiteHeader
        site={site}
        siteId={siteId}
        route={route}
        isSiteOwner={site?.authorId === user?.uid}
      />
      <Flex flexDirection="column" w="full" maxW="700px" mx={4}>
        <FormControl as="form" id="comment" mb={8} onSubmit={onSubmit}>
          <FormLabel>Comment</FormLabel>
          <Textarea
            type="comment"
            htmlFor="comment"
            ref={inputEl}
            placeholder="Leave a comment"
            h="100px"
            backgroundColor="white"
            isDisabled={!user}
          />
          {user && (
            <Button
              type="submit"
              mt={2}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
              isDisabled={router.isFallback}
            >
              Leave Feedback
            </Button>
          )}
        </FormControl>
        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))}
      </Flex>
    </DashboardShell>
  );
};

export default SiteFeedback;
