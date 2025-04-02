"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import { Library, UserRound } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { login } from "@/utils/auth-service";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import Link from "next/link";
import { Loading } from "@/components/loading";
import { handleAxiosError } from "@/utils/handle-axios-error";
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
});

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user, isLoading, mutate } = useUser();

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      await login(data.email, data.password);

      mutate();
      router.push("/staff/dashboard");
    } catch (error) {
      handleAxiosError(error, "An error occurred while logging in.");
    }
  }

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect sesuai dengan role user hanya ketika data user sudah di-fetch
      if (user?.data?.role === "staff") {
        router.push("/staff/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  // Jangan render form login jika user sudah ada (sedang redirect)
  if (isLoading || user) return <Loading />;
  return (
    <div>
      <section className='py-32'>
        <div className='md:container'>
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
                            <Input
                              type='password'
                              placeholder='Enter your password'
                              {...field}
                            />
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
                    <Button type='submit'>Login</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
}
