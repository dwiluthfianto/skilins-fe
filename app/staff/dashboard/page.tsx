"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";

import { CircleFadingPlus, MoveDownLeft, MoveUpRight } from "lucide-react";
import ContentChart from "@/components/staff-panel/charts/content-chart";
import ChartTwo from "@/components/staff-panel/charts/chart-two";
import ChartThree from "@/components/staff-panel/charts/chart-three";
import {
  useAnalyticsContentStats,
  useAnalyticsUser,
} from "@/hooks/use-analytics";
import { DataTable } from "./report-table";
import { columns } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
const calculatePercentageChange = (newValue: number, oldValue: number) => {
  if (oldValue === 0) return newValue === 0 ? 0 : 100;
  return ((newValue - oldValue) / oldValue) * 100;
};

export default function DashboardPage() {
  const { userAnalytics, isLoading, isError } = useAnalyticsUser();
  const {
    contentStats,
    isLoading: isLoadingContent,
    isError: isErrorContent,
  } = useAnalyticsContentStats();
  if (isLoading || isLoadingContent) return <Loading />;
  if (isError || isErrorContent) return <Error />;

  const percentageChangeMonthly = calculatePercentageChange(
    userAnalytics.active_users_monthly,
    userAnalytics.last_month_active_users
  );

  const percentageChangeDaily = calculatePercentageChange(
    userAnalytics.active_users_daily,
    userAnalytics.last_daily_active_users
  );

  const percentageChangeMonthlyContent = calculatePercentageChange(
    contentStats.monthly_stats.current_month_created,
    contentStats.monthly_stats.last_month_created
  );

  return (
    <ContentLayout title='Dashboard'>
      <div className='w-full py-4'>
        <div className='mx-auto '>
          <div className='grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
            <Card className='flex flex-col justify-between  rounded-md '>
              <CardContent className='p-6'>
                {parseFloat(percentageChangeMonthly.toFixed(2)) <= 0 ? (
                  <MoveDownLeft className='w-4 h-4 mb-10 text-destructive' />
                ) : (
                  <MoveUpRight className='w-4 h-4 mb-10 text-primary' />
                )}
                <h2 className='flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular'>
                  {userAnalytics.active_users_monthly}
                  <span
                    className={`text-sm tracking-normal text-muted-foreground`}
                  >
                    {percentageChangeMonthly.toFixed(2)}%
                  </span>
                </h2>
                <p className='max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground'>
                  Monthly active users
                </p>
              </CardContent>
            </Card>
            <Card className='flex flex-col justify-between  rounded-md'>
              <CardContent className='p-6'>
                {parseFloat(percentageChangeDaily.toFixed(2)) <= 0 ? (
                  <MoveDownLeft className='w-4 h-4 mb-10 text-destructive' />
                ) : (
                  <MoveUpRight className='w-4 h-4 mb-10 text-primary' />
                )}
                <h2 className='flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular'>
                  {userAnalytics.active_users_daily}
                  <span className='text-sm tracking-normal text-muted-foreground'>
                    {percentageChangeDaily.toFixed(2)}%
                  </span>
                </h2>
                <p className='max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground'>
                  Daily active users
                </p>
              </CardContent>
            </Card>
            <Card className='flex flex-col justify-between   rounded-md '>
              <CardContent className='p-6'>
                {parseFloat(percentageChangeMonthlyContent.toFixed(2)) <= 0 ? (
                  <MoveDownLeft className='w-4 h-4 mb-10 text-destructive' />
                ) : (
                  <MoveUpRight className='w-4 h-4 mb-10 text-primary' />
                )}
                <h2 className='flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular'>
                  {contentStats.monthly_stats.current_month_created}
                  <span className='text-sm tracking-normal text-muted-foreground'>
                    {percentageChangeMonthlyContent.toFixed(2)}%
                  </span>
                </h2>
                <p className='max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground'>
                  Monthly contents create
                </p>
              </CardContent>
            </Card>
            <Card className='flex flex-col justify-between border rounded-md'>
              <CardContent className='p-6'>
                <CircleFadingPlus className='w-4 h-4 mb-10 text-primary' />
                <h2 className='flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular'>
                  {contentStats.total_contents}
                </h2>
                <p className='max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground'>
                  Total contents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='w-full '>
        <div className='mx-auto '>
          <div className='flex flex-col gap-10'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <ChartThree />
              <ContentChart />
              <ChartTwo />
              <DataTable columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
