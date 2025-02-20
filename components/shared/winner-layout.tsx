/* eslint-disable @typescript-eslint/no-explicit-any */
import { Crown, Trophy, Medal, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { FC } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WinnerProps {
  winners: any[];
}

const WinnerLayout: FC<WinnerProps> = ({ winners }) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className='absolute -top-6 -right-6 z-10'>
            <div className='relative animate-bounce'>
              <Sparkles
                className='absolute -top-2 -left-2 text-yellow-400 dark:text-yellow-300'
                size={24}
              />
              <Crown
                className='text-yellow-400 dark:text-yellow-300'
                size={48}
                fill='currentColor'
              />
            </div>
          </div>
        );
      case 2:
        return (
          <Trophy className='text-gray-300 dark:text-gray-400' size={32} />
        );
      case 3:
        return (
          <Medal className='text-amber-600 dark:text-amber-400' size={32} />
        );
      default:
        return (
          <Badge className='text-lg px-4 py-1 dark:bg-gray-700 dark:text-white'>
            #{rank}
          </Badge>
        );
    }
  };

  return (
    <section className='w-full py-12 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-6 mb-16'>
          <Badge
            variant='outline'
            className='bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700'
          >
            <Sparkles className='w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400' />
            <span className='bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent'>
              Our Champions
            </span>
          </Badge>

          <div className='space-y-4 text-center'>
            <h2 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
              Celebration of Winners
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto dark:text-gray-300'>
              Where talent meets recognition! Explore our outstanding winners
              who raised the bar.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {winners.map((item: any, index) => {
            return (
              <div
                key={item.uuid}
                className={cn(
                  "relative group transition-all duration-300",
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : "h-80"
                )}
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300",
                    index === 0
                      ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-700"
                      : "bg-white dark:bg-gray-800"
                  )}
                >
                  {/* Rank Badge */}
                  <div className='absolute top-4 right-4 z-10'>
                    {getRankBadge(item.rank)}
                  </div>

                  {/* Image with overlay */}
                  <div className='relative'>
                    <AspectRatio ratio={index === 0 ? 16 / 9 : 4 / 3}>
                      <Image
                        src={item.submission.content.thumbnail}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        alt='Winner submission'
                      />
                    </AspectRatio>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  </div>

                  {/* Content */}
                  <CardContent
                    className={cn(
                      "absolute bottom-0 left-0 right-0  dark:text-white p-6",
                      index === 0 ? "space-y-4" : "space-y-2"
                    )}
                  >
                    <h3
                      className={cn(
                        "font-bold tracking-tight dark:text-white",
                        index === 0 ? "text-3xl" : "text-xl text-white"
                      )}
                    >
                      {item.submission.content.title}
                    </h3>
                    <p
                      className={cn(
                        "font-medium  dark:text-gray-300",
                        index === 0 ? "text-xl " : "text-base text-white"
                      )}
                    >
                      by {item.submission.student.name}
                    </p>
                  </CardContent>

                  {/* Additional Info */}
                  <CardFooter className='flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm dark:bg-gray-700/80 dark:backdrop-blur-none'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold dark:text-gray-200'>
                        🏆 Points:
                      </span>
                      <Badge
                        variant='secondary'
                        className='dark:bg-gray-600 dark:text-white'
                      >
                        {item.submission.final_score.toFixed(2)}
                      </Badge>
                    </div>
                    <Badge
                      variant='outline'
                      className='dark:border-gray-600 dark:text-gray-300'
                    >
                      {item.submission.student.major.name || "Unknown School"}
                    </Badge>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Floating Decorations */}
        <div className='absolute right-0 top-1/3 -translate-y-1/2 opacity-20 dark:opacity-30'>
          <Sparkles className='w-48 h-48 text-yellow-400 dark:text-purple-400' />
        </div>
      </div>
    </section>
  );
};

export default WinnerLayout;
