import { Badge } from '@/components/ui/badge';
import { ContentLayout } from '@/components/user-panel/content-layout';

export default function GenrePage() {
  return (
    <ContentLayout title=''>
      <section className='py-4 space-y-8'>
        <div className='flex flex-col gap-10 mb-8'>
          <div className='flex gap-4 flex-col items-start'>
            <div>
              <Badge>Groups</Badge>
            </div>
            <div className='flex gap-2 flex-col'>
              <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>
                Genres
              </h2>
              <p className='text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left'>
                Path to Career, Recognized by Expertise.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
