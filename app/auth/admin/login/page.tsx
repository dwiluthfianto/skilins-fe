"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "../../../../utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { UserRound } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import jwt from "jsonwebtoken";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field has to be filled.",
    })
    .email("This is not valid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      const { data: userData } = await axios.post("/auth/login", data);

      Cookies.set("accessToken", userData.accessToken, { expires: 15 / 1440 });

      const decodedToken = jwt.decode(userData.accessToken) as jwt.JwtPayload;

      // Periksa apakah role adalah admin
      if (decodedToken && decodedToken.role === "admin") {
        toast({
          title: "Login Successful!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(userData.message, null, 2)}
              </code>
            </pre>
          ),
        });

        router.push("/admin/dashboard");
      } else {
        toast({
          title: "Access Denied!",
          description: "You do not have permission to access this page.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error: unknown) {
      console.log();
      toast({
        title: "Login failed!",
        description:
          error.response?.data.statusCode === 401 ? (
            <p className="text-red-600"> Wrong password! </p>
          ) : (
            "Wrong email!"
          ),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div>
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Card className="mx-auto w-full max-w-md">
              <CardHeader className="items-center">
                <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>
                  Enter your information to sign in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your password must be at least 6 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Login</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="mx-auto flex gap-1 text-sm">
              <p>{`Don't have an account?`}</p>
              <a href="#" className="underline">
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
