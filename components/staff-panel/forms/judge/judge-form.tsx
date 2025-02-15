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
import { useState } from 'react';
import axios from '@/utils/axios';
import { handleAxiosError } from '@/utils/handle-axios-error';

const allowedDomains = ['@gmail.com', '@skilins.com'];

const JudgeSchema = z.object({
  email: z
    .string()
    .email('This is not valid email')
    .min(1, 'Email must be filled')
    .refine(
      (email) => allowedDomains.some((domain) => email.endsWith(domain)),
      {
        message: `Email must use one of the following domains: ${allowedDomains.join(
          ', '
        )}`,
      }
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Passwords must have at least one uppercase letter')
    .regex(/[a-z]/, 'Passwords must have at least one lowercase letter')
    .regex(/[0-9]/, 'Password must have at least one number')
    .regex(
      /[@$!%*?&]/,
      'Password must have at least 1 special symbol (@$!%*?&)'
    ),
  fullName: z.string().min(4, 'Full name must be at least 4 characters.'),
  role: z.string().min(1, 'Role judge must be fill.'),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
});

export default function JudgeForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState(false);
  const form = useForm<z.infer<typeof JudgeSchema>>({
    resolver: zodResolver(JudgeSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      role: '',
      linkedin: '',
      instagram: '',
    },
  });

  async function onSubmit(data: z.infer<typeof JudgeSchema>) {
    setLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      role: data.role,
      linkedin: data.linkedin,
      instagram: data.instagram,
    };
    try {
      const { data: judgeData } = await axios.post('/judges/add', payload);

      toast({
        title: 'Success!',
        description: judgeData.message,
      });
    } catch (error) {
      handleAxiosError(error, 'An error occurred while add the judge.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <SquareUserRound width={16} /> Add judge
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Judge</SheetTitle>
          <SheetDescription>
            Add new judge, fill the information below. Click add judge to save.
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
                  <FormLabel>
                    Full name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. John Doe' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>
                    Email <span className='text-red-500'>*</span>{' '}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. judge@skilins.com'
                      {...field}
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>
                    Password <span className='text-red-500'>*</span>{' '}
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        id='hs-toggle-password'
                        type={see ? 'text' : 'password'}
                        placeholder='Enter password'
                        {...field}
                      />
                      <div className='absolute inset-y-0 end-0 flex items-center z-20 cursor-pointer text-gray-400 px-3'>
                        {see ? (
                          <Eye
                            width={18}
                            onClick={() => setSee(false)}
                            className='shrink-0'
                          />
                        ) : (
                          <EyeOff
                            width={18}
                            onClick={() => setSee(true)}
                            className='shrink-0'
                          />
                        )}
                      </div>
                    </div>
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
                    <Loader2 className='animate-spin' /> {`Creating...`}
                  </>
                ) : (
                  'Add judge'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
