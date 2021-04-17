import React from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  return (
    <DashboardShell>
      <SiteTableHeader />
      {!data ? (
        <SiteTableSkeleton />
      ) : data.sites.length ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

export default Dashboard;
