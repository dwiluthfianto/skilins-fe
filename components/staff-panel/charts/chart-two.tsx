'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAnalyticsPklReportStats } from '@/hooks/use-analytics';
import { lastSixMonthsRange } from '@/utils/get-last-six-month-range';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
export default function ChartTwo() {
  const { pklReportStats, isLoading, isError } = useAnalyticsPklReportStats();

  const chartData = pklReportStats?.lastSixMonthsReports;

  const chartConfig = {
    count: {
      label: 'Count',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total PKL Reports</CardTitle>
        <CardDescription>{lastSixMonthsRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              left: -20,
            }}
          >
            <XAxis type='number' dataKey='count' hide />
            <YAxis
              dataKey='month'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='count' fill='var(--color-count)' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by this month <TrendingUp className='w-4 h-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total PKL reports for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
