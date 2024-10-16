"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";

import { MoveDownLeft, MoveUpRight } from "lucide-react";
import ContentChart from "@/components/admin-panel/charts/content-chart";
import ChartTwo from "@/components/admin-panel/charts/chart-two";
import ChartThree from "@/components/admin-panel/charts/chart-three";
import {
  useAnalyticsContentStats,
  useAnalyticsUser,
} from "@/hooks/use-analytics";
import { DataTable } from "./report-table";
import { columns } from "./columns";

const calculatePercentageChange = (newValue: number, oldValue: number) => {
  if (oldValue === 0) return newValue === 0 ? 0 : 100;
  return ((newValue - oldValue) / oldValue) * 100;
};

export default function DashboardPage() {
  const { userAnalytics, isLoading, isError } = useAnalyticsUser();
  const { data } = useAnalyticsContentStats();
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  const percentageChangeMonthly = calculatePercentageChange(
    userAnalytics.activeUsersMonthly,
    userAnalytics.lastMonthActiveUsers
  );

  const percentageChangeDaily = calculatePercentageChange(
    userAnalytics.activeUsersDaily,
    userAnalytics.lastDailyActiveUsers
  );

  const { monthlyContent, totalContents } = data;
  const percentageChangeMonthlyContent = calculatePercentageChange(
    monthlyContent.monthlyContentCreate,
    monthlyContent.lastMonthContentCreate
  );

  return (
    <ContentLayout title="Dashboard">
      <div className="w-full py-4">
        <div className="mx-auto ">
          <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col justify-between gap-0 p-6 bg-white border rounded-md dark:bg-black">
              {parseFloat(percentageChangeMonthly.toFixed(2)) <= 0 ? (
                <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              ) : (
                <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              )}
              <h2 className="flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular">
                {userAnalytics.activeUsersMonthly}
                <span
                  className={`text-sm tracking-normal text-muted-foreground`}
                >
                  {percentageChangeMonthly.toFixed(2)}%
                </span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground">
                Monthly active users
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 p-6 bg-white border rounded-md dark:bg-black">
              {parseFloat(percentageChangeDaily.toFixed(2)) <= 0 ? (
                <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              ) : (
                <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              )}
              <h2 className="flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular">
                {userAnalytics.activeUsersDaily}
                <span className="text-sm tracking-normal text-muted-foreground">
                  {percentageChangeDaily.toFixed(2)}%
                </span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground">
                Daily active users
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 p-6 bg-white border rounded-md dark:bg-black">
              {parseFloat(percentageChangeMonthlyContent.toFixed(2)) <= 0 ? (
                <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              ) : (
                <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              )}
              <h2 className="flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular">
                {monthlyContent.monthlyContentCreate}
                <span className="text-sm tracking-normal text-muted-foreground">
                  {percentageChangeMonthlyContent.toFixed(2)}%
                </span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground">
                Monthly contents create
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 p-6 bg-white border rounded-md dark:bg-black">
              <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              <h2 className="flex flex-row items-end max-w-xl gap-4 text-4xl tracking-tighter text-left font-regular">
                {totalContents}
              </h2>
              <p className="max-w-xl text-base leading-relaxed tracking-tight text-left text-muted-foreground">
                Total contents
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="mx-auto ">
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
