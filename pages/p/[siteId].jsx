import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Input, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';

const SiteFeedback = ({ initialFeedback }) => {
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const inputEl = useRef(null);
  const router = useRouter();
  const auth = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Flex flexDirection="column" w="full" maxW="700px" m="0 auto">
      <FormControl as="form" id="comment" my={8} onSubmit={onSubmit}>
        <FormLabel>Comment</FormLabel>
        <Input type="comment" htmlFor="comment" ref={inputEl} />
        <Button type="submit" fontWeight="medium" mt={2}>
          Add Comments
        </Button>
      </FormControl>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Flex>
  );
};

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default SiteFeedback;
