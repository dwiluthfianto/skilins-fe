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
import { FC, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { CommentRatings } from '../ratings';
import { AutosizeTextarea } from '../autosize-textarea';
import { useEvaluationParameter, useJudgeUser } from '@/hooks/use-judge';
import { ScrollArea } from '../ui/scroll-area';
import { handleAxiosError } from '@/utils/handle-axios-error';
import { Loading } from '../loading';

const FeedbackSchema = z.object({
  parameter_scores: z.array(
    z.object({
      parameter_uuid: z.string(),
      notes: z.string().optional(),
      score: z.number().min(0).max(5),
    })
  ),
});

interface FeedbackJudgeProps {
  competitionUuid: string;
  submissionUuid: string;
}

const FeedbackJudge: FC<FeedbackJudgeProps> = ({
  competitionUuid,
  submissionUuid,
}) => {
  const { parameters, parameter_scores, isLoading } =
    useEvaluationParameter(competitionUuid);
  const [loading, setLoading] = useState(false);
  const { judge } = useJudgeUser();
  const router = useRouter();

  // Initialize form with empty array
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      parameter_scores: [],
    },
  });

  useEffect(() => {
    if (parameters && parameters.length > 0) {
      const initialScores = parameters.map((param: any) => {
        const existingScore = parameter_scores?.find(
          (score: any) => score.parameter.uuid === param.uuid
        );

        return {
          parameter_uuid: param.uuid,
          notes: existingScore?.notes || '',
          score: existingScore?.score || 0,
        };
      });

      form.reset({
        parameter_scores: initialScores,
      });
    }
  }, [parameters, parameter_scores, form]);

  async function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    setLoading(true);

    try {
      const { data: judgeData } = await axios.patch(
        `/judges/${judge?.uuid}/submission`,
        {
          submission_uuid: submissionUuid,
          parameter_scores: data.parameter_scores,
        }
      );
      router.push('/judge/dashboard');
      toast({
        title: 'Success!',
        description: judgeData.message,
      });
    } catch (error) {
      handleAxiosError(error, 'An error occurred while judge submission.');
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='items-end'>Judge Submission</Button>
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
            <ScrollArea className='h-[500px]'>
              {parameters?.map((param: any, index: number) => (
                <FormField
                  key={param.uuid}
                  control={form.control}
                  name={`parameter_scores.${index}.score`}
                  render={({ field }) => (
                    <FormItem className='p-4'>
                      <FormLabel>{param.parameter_name}</FormLabel>
                      <FormControl>
                        <CommentRatings
                          rating={field.value || 0}
                          totalStars={5}
                          size={32}
                          variant='yellow'
                          onRatingChange={(value) => {
                            form.setValue(
                              `parameter_scores.${index}.score`,
                              value
                            );
                            form.setValue(
                              `parameter_scores.${index}.parameter_uuid`,
                              param.uuid
                            );
                          }}
                        />
                      </FormControl>
                      <FormField
                        name={`parameter_scores.${index}.notes`}
                        render={({ field }) => (
                          <AutosizeTextarea
                            placeholder={`Notes for ${param.parameter_name}`}
                            {...field}
                          />
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </ScrollArea>
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
