import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentLayout } from '@/components/user-panel/content-layout';

interface ContentUpdateSkeletonProps {
  withThumbnail?: boolean;
  withFile?: boolean;
  withDuration?: boolean;
}

export function ContentUpdateSkeleton({
  withThumbnail = true,
  withFile = false,
  withDuration = false,
}: ContentUpdateSkeletonProps) {
  return (
    <ContentLayout title=''>
      <div className='max-w-4xl mx-auto'>
        {/* Page title skeleton */}
        <div className='h-7 w-32 bg-slate-200 rounded-md mb-4 animate-pulse' />

        <Card>
          <CardContent className='p-0'>
            <div className='m-8 space-y-4'>
              {/* Thumbnail skeleton */}
              {withThumbnail && (
                <div className='relative aspect-square w-full max-w-[300px] rounded-md bg-slate-200 animate-pulse' />
              )}

              {/* Title skeleton */}
              <div className='h-12 bg-slate-200 rounded-md animate-pulse' />

              <Separator />

              {/* Category skeleton */}
              <div className='h-10 bg-slate-200 rounded-md animate-pulse' />

              <Separator />

              {/* Tags skeleton */}
              <div className='flex gap-2'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='h-8 w-20 bg-slate-200 rounded-full animate-pulse'
                  />
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className='mx-8 mb-8 space-y-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-4 bg-slate-200 rounded-md animate-pulse w-full'
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              ))}
            </div>

            <div className='m-8 space-y-4'>
              {/* Genres skeleton */}
              <div className='flex gap-2'>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className='h-8 w-20 bg-slate-200 rounded-full animate-pulse'
                  />
                ))}
              </div>

              <Separator />

              {/* File uploader skeleton */}
              {withFile && (
                <>
                  <div className='h-32 bg-slate-200 rounded-md animate-pulse' />
                  <Separator />
                </>
              )}

              {/* Duration skeleton */}
              {withDuration && (
                <div className='space-y-2'>
                  <div className='h-4 w-16 bg-slate-200 rounded-md animate-pulse' />
                  <div className='h-8 w-24 bg-slate-200 rounded-md animate-pulse' />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Button skeleton */}
        <div className='h-10 w-24 bg-slate-200 rounded-md animate-pulse mt-6' />
      </div>
    </ContentLayout>
  );
}
