import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  console.log(data);

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data && data.site?.name} />
      {!data ? (
        <SiteTableSkeleton />
      ) : data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

export default SiteFeedback;
