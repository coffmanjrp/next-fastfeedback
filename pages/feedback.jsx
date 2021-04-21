import React from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

const UserFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  return (
    <DashboardShell>
      <FeedbackTableHeader siteName={'All Feedback'} />
      {!data ? (
        <SiteTableSkeleton />
      ) : data.feedback?.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

export default UserFeedback;
