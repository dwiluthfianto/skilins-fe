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
import ImageUploader from '@/components/imageUploader';
import { useRouter } from 'next/navigation';
import { CalendarIcon, CircleAlert, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ContentLayout } from '@/components/staff-panel/content-layout';

import { AutosizeTextarea } from '@/components/autosize-textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CustomCalendar } from '@/components/ui/custom-calendar';
import { cn } from '@/lib/utils';
import MinimalTiptapOne from '@/components/minimal-tiptap/minimal-tiptap-one';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tag, TagInput } from 'emblor';
import { useJudge } from '@/hooks/use-judge';
const ContentSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be longer than or equal to 5 characters' }),
  thumbnail: z.instanceof(File).nullable(),
  description: z.string().min(1, { message: 'Description is required.' }),
  guide: z.string().min(1, { message: 'Guide is required.' }),
  type_competition: z
    .string()
    .min(1, { message: 'Type of Competition is required.' }),
  start_date: z.date(),
  end_date: z.date(),
  submission_deadline: z.date(),
  judges: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function CreateCompetition() {
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: '',
      thumbnail: undefined,
      type_competition: 'AUDIO',
      description: '',
      guide: '',
      start_date: new Date(),
      end_date: new Date(),
      submission_deadline: new Date(),
      judges: [],
    },
  });
  const [judges, setJudges] = useState<Tag[]>([]);
  const [activeJudgeIndex, setActiveJudgeIndex] = useState<number | null>(null);
  const { autocompleteJudges } = useJudge();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    const formData = new FormData();
    if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('guide', data.guide);
    formData.append('start_date', String(data.start_date));
    formData.append('end_date', String(data.end_date));
    formData.append('type', data.type_competition);
    formData.append('submission_deadline', String(data.submission_deadline));
    formData.append('judge_uuids', JSON.stringify(data.judges));

    try {
      const { data: contentData } = await axios.post(
        '/competitions',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast({
        title: 'Success!',
        description: contentData.message,
      });

      router.push('/staff/competitions/list');
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Error!',
          description:
            error?.response.data.message ||
            error?.response.data.error ||
            'An error occurred while add the competition.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentLayout title=''>
      <div className='max-w-4xl mx-auto'>
        <h1 className='font-semibold mb-4'>Create Competition</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardContent className='p-0'>
                <div className='m-8 space-y-4'>
                  <FormField
                    control={form.control}
                    name='thumbnail'
                    render={() => (
                      <ImageUploader
                        onChange={(file) => form.setValue('thumbnail', file)}
                        ratioImage={16 / 9}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative group'>
                            <AutosizeTextarea
                              {...field}
                              maxLength={45}
                              placeholder='New competition title here...'
                              className='outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden '
                            />
                            <div className='absolute inset-y-0 end-0 flex items-center z-20 cursor-pointer text-gray-400 px-3'>
                              <CircleAlert width={18} className='shrink-0' />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='type_competition'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex items-center gap-4'
                          >
                            <FormItem>
                              <FormControl>
                                <Label
                                  htmlFor='audio'
                                  className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800'
                                >
                                  <RadioGroupItem id='audio' value='AUDIO' />
                                  Audio
                                </Label>
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <Label
                                  htmlFor='video'
                                  className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800'
                                >
                                  <RadioGroupItem id='video' value='VIDEO' />
                                  Video
                                </Label>
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <Label
                                  htmlFor='prakerin'
                                  className='border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800'
                                >
                                  <RadioGroupItem
                                    id='prakerin'
                                    value='PRAKERIN'
                                  />
                                  Prakerin
                                </Label>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AutosizeTextarea
                            {...field}
                            placeholder='Description of competition here...'
                            maxLength={150}
                            className='border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none resize-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />
                  <FormField
                    control={form.control}
                    name='start_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-base text-muted-foreground'>
                          Start date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='end'>
                            <CustomCalendar
                              initialFocus
                              mode='single'
                              captionLayout='dropdown-buttons' //Also: dropdown | buttons
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                              className='rounded-md border'
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='end_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-base text-muted-foreground'>
                          End date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='end'>
                            <CustomCalendar
                              initialFocus
                              mode='single'
                              captionLayout='dropdown-buttons' //Also: dropdown | buttons
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < form.getValues('start_date')
                              }
                              // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                              className='rounded-md border'
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='guide'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MinimalTiptapOne
                          {...field}
                          className='w-full'
                          editorContentClassName='px-8 py-4 shadow-none'
                          output='html'
                          placeholder='Type competition guide here...'
                          autofocus={true}
                          editable={true}
                          editorClassName='focus:outline-none'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='m-8 space-y-4'>
                  <FormField
                    control={form.control}
                    name='submission_deadline'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-base text-muted-foreground'>
                          Submission Deadline
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='end'>
                            <CustomCalendar
                              initialFocus
                              mode='single'
                              captionLayout='dropdown-buttons' //Also: dropdown | buttons
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < form.getValues('start_date') ||
                                date > form.getValues('end_date')
                              }
                              // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                              className='rounded-md border'
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='judges'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagInput
                            {...field}
                            tags={judges}
                            setTags={(newTags) => {
                              setJudges(newTags);
                              form.setValue(
                                'judges',
                                newTags as [Tag, ...Tag[]]
                              );
                            }}
                            placeholder='Add up to 4 judges...'
                            styleClasses={{
                              input:
                                'w-full h-fit outline-none border-none shadow-none  text-base p-0',
                              inlineTagsContainer: 'border-none p-0',
                              autoComplete: {
                                command: '[&>div]:border-none',
                                popoverContent: 'p-4',
                                commandList: 'list-none',
                                commandGroup: 'font-bold',
                              },
                            }}
                            activeTagIndex={activeJudgeIndex}
                            setActiveTagIndex={setActiveJudgeIndex}
                            enableAutocomplete={true}
                            autocompleteOptions={autocompleteJudges}
                            restrictTagsToAutocompleteOptions={true}
                            minTags={3}
                            maxTags={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Button className='mt-6' disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='animate-spin' /> {`Publishing...`}
                </>
              ) : (
                'Publish'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
