"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { EyeOff, Eye, Library, UserRound } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { login } from "@/utils/auth-service";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { Loading } from "@/components/loading";
import ReCAPTCHA from "react-google-recaptcha";

const allowedDomains = ["@gmail.com", "@skilins.com"];

const LoginSchema = z.object({
  email: z
    .string()
    .email("This is not valid email")
    .min(1, "Email must be filled")
    .refine(
      (email) => allowedDomains.some((domain) => email.endsWith(domain)),
      {
        message: `Email must use one of the following domains: ${allowedDomains.join(
          ", "
        )}`,
      }
    ),
  password: z.string().min(8, "Password must be at least 8 characters."),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

export default function Login() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [see, setSee] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      recaptcha: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      if (user?.data?.role === "staff") {
        router.push("/staff/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  if (!isMounted) return null;
  if (isLoading || user) return <Loading />;

  async function handleChange(token: string | null) {
    if (token) {
      form.setValue("recaptcha", token);
    } else {
      form.setError("recaptcha", {
        type: "manual",
        message: "reCAPTCHA verification failed",
      });
    }
  }

  async function handleExpired() {
    form.setValue("recaptcha", "");
    form.setError("recaptcha", {
      type: "manual",
      message: "reCAPTCHA has expired, please verify again",
    });
  }

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      await login(data.email, data.password);

      router.push("/");
    } catch (error) {
      handleAxiosError(error, "An error occurred while logging in.");
      recaptchaRef.current?.reset();
      form.setValue("recaptcha", "");
    }
  }

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
                <CardTitle className='text-xl'>Sign In</CardTitle>
                <CardDescription>
                  Enter your information to sign in
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
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem className='grid gap-2'>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type={see ? "text" : "password"}
                                placeholder='Enter your password'
                                {...field}
                              />
                              <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                                {see ? (
                                  <Eye
                                    onClick={() => setSee(false)}
                                    className='h-4 w-4 text-muted-foreground'
                                  />
                                ) : (
                                  <EyeOff
                                    onClick={() => setSee(true)}
                                    className='h-4 w-4 text-muted-foreground'
                                  />
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      className='flex items-end w-full justify-end text-sm text-blue-400 hover:underline'
                      href={"/auth/reset-password"}
                    >
                      Forgot password ?
                    </Link>
                    <FormField
                      control={form.control}
                      name='recaptcha'
                      render={({ field }) => (
                        <FormItem className='grid gap-2'>
                          <FormControl>
                            <ReCAPTCHA
                              sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                              }
                              ref={recaptchaRef}
                              onChange={handleChange}
                              onExpired={handleExpired}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' disabled={!form.watch("recaptcha")}>
                      Login
                    </Button>
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
