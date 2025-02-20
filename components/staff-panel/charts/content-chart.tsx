"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAnalyticsCountContent } from "@/hooks/use-analytics";
import { format, subMonths } from "date-fns";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
export const description = "A bar chart with an active bar";

export default function ContentChart() {
  const { contentStats, isLoading, isError } = useAnalyticsCountContent();

  const chartConfig = {
    contents: {
      label: "Contents",
    },
    ebook: {
      label: "Ebook",
      color: "hsl(var(--chart-1))",
    },
    story: {
      label: "Story",
      color: "hsl(var(--chart-1))",
    },
    prakerin: {
      label: "Prakerin",
      color: "hsl(var(--chart-1))",
    },
    audio: {
      label: "Audio",
      color: "hsl(var(--chart-1))",
    },
    video: {
      label: "Video",
      color: "hsl(var(--chart-1))",
    },
    blog: {
      label: "Blog",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      content: "ebook",
      counts: contentStats?.content_types.ebook,
      fill: "var(--color-ebook)",
    },
    {
      content: "story",
      counts: contentStats?.content_types.story,
      fill: "var(--color-story)",
    },
    {
      content: "prakerin",
      counts: contentStats?.content_types.prakerin,
      fill: "var(--color-prakerin)",
    },
    {
      content: "audio",
      counts: contentStats?.content_types.audio,
      fill: "var(--color-audio)",
    },
    {
      content: "video",
      counts: contentStats?.content_types.video,
      fill: "var(--color-video)",
    },
    {
      content: "blog",
      counts: contentStats?.content_types.blog,
      fill: "var(--color-blog)",
    },
  ];

  const getLastSixMonthsRange = () => {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5); // Mengurangi 5 bulan dari bulan sekarang, jadi akan mencakup 6 bulan

    // Format tanggal
    const startMonth = format(sixMonthsAgo, "MMMM"); // Bulan awal
    const endMonth = format(now, "MMMM"); // Bulan akhir
    const year = format(now, "yyyy"); // Tahun (asumsi sama, jika beda tahun, perlu penyesuaian)

    return `${startMonth} - ${endMonth} ${year}`;
  };

  const lastSixMonthsRange = getLastSixMonthsRange();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amount of Content</CardTitle>
        <CardDescription>{lastSixMonthsRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='content'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey='counts'
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by {contentStats?.trending_stat}% this month{" "}
          {contentStats?.trending_stat <= 0 ? (
            <TrendingDown className='w-4 h-4' />
          ) : (
            <TrendingUp className='w-4 h-4' />
          )}
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total of contents for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
