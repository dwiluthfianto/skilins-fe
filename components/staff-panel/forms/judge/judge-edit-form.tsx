import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, SquareUserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import { handleAxiosError } from '@/utils/handle-axios-error';

const allowedDomains = ['@gmail.com', '@skilins.com'];

const JudgeSchema = z.object({
  fullName: z.string().min(1, 'Full name must be fill.'),
  role: z.string().min(1, 'Role judge must be fill.'),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
});

export default function JudgeEditForm({
  isEditDialogOpen,
  setIsEditDialogOpen,
  values,
}: any) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof JudgeSchema>>({
    resolver: zodResolver(JudgeSchema),
    defaultValues: {
      fullName: values?.full_name || '',
      role: values?.judge?.role || '',
      linkedin: values?.judge?.linkedin || '',
      instagram: values?.judge?.instagram || '',
    },
  });

  useEffect(() => {
    if (values) {
      form.reset({
        fullName: values.full_name,
        role: values.judge.role,
        linkedin: values.judge.linkedin,
        instagram: values.judge.instagram,
      });
    }
  }, [values, form]);

  async function onSubmit(data: z.infer<typeof JudgeSchema>) {
    setLoading(true);

    const payload = {
      full_name: data.fullName,
      role: data.role,
      linkedin: data.linkedin,
      instagram: data.instagram,
    };
    try {
      const { data: judgeData } = await axios.patch(
        `/judges/${values?.uuid}`,
        payload
      );

      toast({
        title: 'Success!',
        description: judgeData.message,
      });
    } catch (error) {
      handleAxiosError(error, 'An error occurred while add the judge.');
    } finally {
      setLoading(false);
      setIsEditDialogOpen(false);
    }
  }
  return (
    <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Judge</SheetTitle>
          <SheetDescription>
            Update judge, fill the information below. Click update judge to
            save.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 mt-8'
          >
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. John Doe' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>
                    Role <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Content Creator | PT. Example'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='linkedin'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Linkedin (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. https://linkedin.com/john-doe'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='linkedin'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Instagram (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. https://instagram.com/john-doe'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button className='mt-6' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin' /> {`Updating...`}
                  </>
                ) : (
                  'Update judge'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
