'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Library, UserRound } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { resetPassword } from '@/utils/auth-service';
import Link from 'next/link';
import { useState } from 'react';
import axios from '@/utils/axios';
import { AxiosError } from 'axios';
import { handleAxiosError } from '@/utils/handle-axios-error';
export const dynamic = 'force-dynamic';

const ForgotSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'This field has to be filled.',
    })
    .email('This is not valid email'),
});

const ResetSchema = z.object({
  newPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const formReset = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [verificationStatus, setVerificationStatus] = useState('');

  async function onSubmit(data: z.infer<typeof ForgotSchema>) {
    try {
      await resetPassword(data.email);

      toast({
        title: 'Link has been send to your email!',
        variant: 'default',
      });
    } catch (error) {
      handleAxiosError(error, 'An error occurred while reset password.');
    }
  }

  const changePassword = async (data: z.infer<typeof ResetSchema>) => {
    try {
      if (data.newPassword === data.confirmPassword) {
        await axios.post(`auth/reset-password`, {
          password: data.newPassword,
          token: token,
        });
        toast({
          title: 'Password has been changed',
          action: (
            <ToastAction altText='Back to home'>
              <Link href='/'>Back to Home</Link>
            </ToastAction>
          ),
        });
      } else {
        setVerificationStatus('Password is not same!');
      }
    } catch (error) {
      handleAxiosError(error, 'An error occurred while reset password.');
      setVerificationStatus('Reset password failed. Please try again.');
    }
  };

  if (token) {
    return (
      <div>
        <section className='py-32'>
          <div className='container'>
            <div className='flex flex-col gap-4'>
              <Link href='/' className='flex justify-center items-center pt-1'>
                <div className=' flex justify-center items-center  p-[1px] rounded-md border-2 border-black mr-2'>
                  <Library width={24} height={24} />
                </div>
                <h1 className='font-bold text-xl md:text-2xl'>skilins.</h1>
              </Link>
              <Card className='mx-auto w-full max-w-sm'>
                <CardHeader className='items-center'>
                  <UserRound className='size-10 rounded-full bg-accent p-2.5 text-muted-foreground' />
                  <CardTitle className='text-xl'>Change Password</CardTitle>
                  <CardDescription>
                    Remember your password?{' '}
                    <Link
                      href='/auth/user/login'
                      className='text-blue-400 hover:underline'
                    >
                      Login here
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...formReset}>
                    <form
                      onSubmit={formReset.handleSubmit(changePassword)}
                      className='grid gap-4'
                    >
                      <FormField
                        control={formReset.control}
                        name='newPassword'
                        render={({ field }) => (
                          <FormItem className='grid gap-2'>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your new password'
                                {...field}
                                type='password'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formReset.control}
                        name='confirmPassword'
                        render={({ field }) => (
                          <FormItem className='grid gap-2'>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your password again to confirm'
                                {...field}
                                type='password'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormDescription>{verificationStatus}</FormDescription>
                      <Button type='submit'>Reset Password</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              <div className='mx-auto flex gap-1 text-sm'>
                <p>{`Don't have an account?`}</p>
                <a href='/auth/user/register' className='underline'>
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </div>
    );
  } else {
    return (
      <div>
        <section className='py-32'>
          <div className='container'>
            <div className='flex flex-col gap-4'>
              <Link href='/' className='flex justify-center items-center pt-1'>
                <div className=' flex justify-center items-center  p-[1px] rounded-md border-2 border-black mr-2'>
                  <Library width={24} height={24} />
                </div>
                <h1 className='font-bold text-xl md:text-2xl'>skilins.</h1>
              </Link>
              <Card className='mx-auto w-full max-w-sm'>
                <CardHeader className='items-center'>
                  <UserRound className='size-10 rounded-full bg-accent p-2.5 text-muted-foreground' />
                  <CardTitle className='text-xl'>Forgot Password?</CardTitle>
                  <CardDescription>
                    Remember your password?{' '}
                    <Link
                      href='/auth/user/login'
                      className='text-blue-400 hover:underline'
                    >
                      Login here
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='grid gap-4'
                    >
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem className='grid gap-2'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your email'
                                {...field}
                                type='email'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type='submit'>Reset Password</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              <div className='mx-auto flex gap-1 text-sm'>
                <p>{`Don't have an account?`}</p>
                <a href='/auth/user/register' className='underline'>
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </div>
    );
  }
}
