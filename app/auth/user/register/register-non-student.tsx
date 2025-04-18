"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { register } from "@/utils/auth-service";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { useState } from "react";

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
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Passwords must have at least one uppercase letter")
    .regex(/[a-z]/, "Passwords must have at least one lowercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must have at least 1 special symbol (@$!%*?&)"
    ),
  fullName: z.string().min(4, "Full name must be at least 4 characters."),
});

export default function RegisterNonStudent() {
  const router = useRouter();
  const [see, setSee] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", fullName: "" },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setLoading(true);
    try {
      await register(data);
      router.push("/auth/verify-email");
    } catch (error) {
      handleAxiosError(error, "An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto w-full '>
      <CardHeader className='items-center'>
        <UserRound className='size-10 rounded-full bg-accent p-2.5 text-muted-foreground' />
        <CardTitle className='text-xl'>Sign up</CardTitle>
        <CardDescription>Enter your information to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your Full name'
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
            <Button type='submit' disabled={loading}>
              {loading ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
