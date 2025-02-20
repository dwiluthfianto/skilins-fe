/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFeedbackStats } from "@/hooks/use-analytics";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
const chartConfig = {
  feedbacks: {
    label: "Page feedbacks",
  },
  comment: {
    label: "Comments",
    color: "hsl(var(--chart-1))",
  },
  rating: {
    label: "Ratings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ChartThree() {
  const { feedbackStats, isLoading, isError } = useFeedbackStats();

  const chartData = feedbackStats?.last_three_months_comments.map(
    (item: { date: any; count: any }, index: string | number) => ({
      date: item.date,
      comment: Number(item.count),
      rating: Number(feedbackStats.last_three_months_rating[index]?.count || 0),
    })
  );

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("comment");

  const total = React.useMemo(
    () => ({
      comment: chartData?.reduce(
        (acc: number, curr: { comment: number }) => acc + curr.comment,
        0
      ),
      rating: chartData?.reduce(
        (acc: number, curr: { rating: number }) => acc + curr.rating,
        0
      ),
    }),
    [chartData]
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Card className='flex flex-col justify-between h-full rounded-md lg:col-span-2 lg:aspect-auto'>
      <CardHeader className='flex flex-col items-stretch p-0 space-y-0 border-b md:flex-row'>
        <div className='flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>User Interactions</CardTitle>
          <CardDescription>
            Showing total interactions for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {["comment", "rating"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart]?.label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='feedbacks'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
