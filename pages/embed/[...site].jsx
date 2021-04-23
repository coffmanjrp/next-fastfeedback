import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import { useTheme } from '@/utils/useTheme';

const EmbeddedFeedbackPage = ({ initialFeedback, site }) => {
  const router = useRouter();
  const colorMode = useTheme();
  const textColor = {
    light: 'gray.900',
    dark: 'gray.200',
  };

  return (
    <Flex flexDirection="column" w="full">
      <FeedbackLink paths={router?.query?.site || []} />
      {initialFeedback.length ? (
        initialFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))
      ) : (
        <Text color={textColor[colorMode]}>
          There are no comments for this site.
        </Text>
      )}
    </Flex>
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

export default EmbeddedFeedbackPage;
