import React from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  const isPaidAccount = user?.stripeRole;

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {!data ? (
        <SiteTableSkeleton />
      ) : data.sites.length ? (
        <SiteTable sites={data.sites} />
      ) : isPaidAccount ? (
        <EmptyState />
      ) : (
        <UpgradeEmptyState />
      )}
    </DashboardShell>
  );
};

export default Dashboard;
