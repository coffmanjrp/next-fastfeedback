import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import DashboardShell from '@/components/DashboardShell';
import Feedback from '@/components/Feedback';
import SiteHeader from '@/components/SiteHeader';

const SiteFeedback = ({ initialFeedback, site }) => {
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const inputEl = useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    };

    inputEl.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
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
          />
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
        </FormControl>
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Flex>
    </DashboardShell>
  );
};

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default SiteFeedback;
