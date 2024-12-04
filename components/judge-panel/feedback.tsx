'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/utils/axios';
import { FC, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { CommentRatings } from '../ratings';
import { AutosizeTextarea } from '../autosize-textarea';
import { useJudgeUser } from '@/hooks/use-judge';

const FeedbackSchema = z.object({
  score: z.coerce
    .number()
    .min(1, {
      message: 'Score must be at least 1.',
    })
    .max(5, {
      message: "Score can't more than 5",
    }),
  comment: z.coerce
    .string()
    .min(20, { message: 'Comment must be at least 20 character' }),
});

interface FeedbackJudgeProps {
  submissionUuid: string;
}

const FeedbackJudge: FC<FeedbackJudgeProps> = ({ submissionUuid }) => {
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      score: 0,
      comment: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const { judge } = useJudgeUser();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    setLoading(true);

    try {
      await axios.patch(`/judges/${judge && judge.uuid}/submission`, {
        submission_uuid: submissionUuid,
        score: data.score,
        comment: data.comment,
      });
      router.push('/judge/dashboard');
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Error!',
          description:
            error?.response.data.message ||
            error?.response.data.error ||
            'An error occurred while add the blog.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Judge Submission</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Judge Submission</DialogTitle>
          <DialogDescription>
            {`Judge submission. Click judge when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='score'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ratings</FormLabel>
                  <FormControl>
                    <CommentRatings
                      rating={field.value}
                      totalStars={5}
                      size={32}
                      variant='yellow'
                      onRatingChange={(value) => form.setValue('score', value)}
                      className='hover:cursor-pointer'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <AutosizeTextarea placeholder='comment' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className='mt-6' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin' /> {`Judging...`}
                  </>
                ) : (
                  'Judge'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackJudge;
