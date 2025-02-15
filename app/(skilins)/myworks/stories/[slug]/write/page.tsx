'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/utils/axios';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AutosizeTextarea } from '@/components/autosize-textarea';
import MinimalTiptapOne from '@/components/minimal-tiptap/minimal-tiptap-one';
import { ContentLayout } from '@/components/user-panel/content-layout';
import { useStoryBySlug } from '@/hooks/use-story';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/utils/handle-axios-error';
import { Loading } from '@/components/loading';
import {
  GuidedFormLayout,
  useGuidedField,
} from '@/components/form-guidance/guided-form-layout';
import { STORY_TOOLTIPS } from '@/lib/tooltips';
const ContentSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be longer than or equal to 5 characters' }),
  content: z.string().min(1, { message: 'Content must be filled' }),
  order: z.coerce.number().min(1, { message: 'Order must be filled' }),
});

export default function StoryCreate() {
  const params = useParams<{ slug: string }>();
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: '',
      content: '',
      order: 1,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { story, isLoading } = useStoryBySlug(params.slug);

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    try {
      const { data: contentData } = await axios.post(
        `/contents/stories/${story.uuid}/episodes`,
        { title: data.title, content: data.content, order: data.order }
      );

      toast({
        title: 'Success!',
        description: contentData.message,
      });

      router.back();
    } catch (error) {
      handleAxiosError(error, 'An error occurred while submit the story.');
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <ContentLayout title=''>
      <GuidedFormLayout tooltips={STORY_TOOLTIPS}>
        <div className='max-w-4xl mx-auto space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardContent className='p-0'>
                  <div className='m-8 space-y-4'>
                    <FormField
                      control={form.control}
                      name='order'
                      render={({ field }) => (
                        <FormItem
                          className='flex items-center justify-center '
                          {...useGuidedField('order')}
                        >
                          <FormLabel className='text-xl text-muted-foreground'>
                            Part:{' '}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type='number'
                              min={1}
                              className='outline-none text-2xl w-20 p-0 !mt-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full text-center'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AutosizeTextarea
                              {...field}
                              {...useGuidedField('title')}
                              placeholder='New episode title here...'
                              className='outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden text-center'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem {...useGuidedField('content')}>
                        <FormControl>
                          <MinimalTiptapOne
                            {...field}
                            className='w-full'
                            editorContentClassName='px-8 py-4 shadow-none'
                            output='html'
                            placeholder='Type your stories here...'
                            autofocus={true}
                            editable={true}
                            editorClassName='focus:outline-none'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button
                className='mt-6 mr-4'
                variant={'ghost'}
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button className='mt-6' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin' /> {`Saving...`}
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </GuidedFormLayout>
    </ContentLayout>
  );
}
