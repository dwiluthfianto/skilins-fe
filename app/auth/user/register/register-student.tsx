// components/RegisterStudent.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { registerStudent } from "@/utils/auth-service";
import { useRouter } from "next/navigation";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { format } from "date-fns";
import { CalendarIcon, Loader2, UserRound, Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMajor } from "@/hooks/use-major";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { useRef, useState } from "react";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import ReCAPTCHA from "react-google-recaptcha";
const allowedDomains = ["@gmail.com", "@skilins.com"];

const StudentSchema = z.object({
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
  nis: z.coerce.number().min(1, {
    message: "This field has to be filled.",
  }),
  name: z.string().min(4, {
    message: "Full name must be at least 4 characters.",
  }),
  major: z.string().min(1, {
    message: "Major has to be filled.",
  }),
  birthplace: z.string().min(1, {
    message: "Birthplace has to be filled.",
  }),
  birthdate: z.coerce.date(),
  sex: z.enum(["male", "female"], {
    required_error: "You need to select a sex.",
  }),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

export default function RegisterStudent() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      nis: 0,
      major: "",
      birthplace: "",
      birthdate: new Date(),
      sex: "male",
      recaptcha: "",
    },
  });

  const { major, isLoading, isError } = useMajor();

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

  async function onSubmit(data: z.infer<typeof StudentSchema>) {
    setLoading(true);
    try {
      await registerStudent(data);
      router.push("/auth/verify-email");
    } catch (error) {
      handleAxiosError(error, "An error occurred while registering.");
      recaptchaRef.current?.reset();
      form.setValue("recaptcha", "");
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

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
                  <FormDescription>
                    Your password must be at least 6 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <div>
              <h1 className='text-xl font-semibold'>Student information</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your student information
              </p>
            </div>
            <FormField
              control={form.control}
              name='nis' //nis
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>NIS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your NIS'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Full name (Legal name)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your Full name (Legal name)'
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
              name='sex'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row items-center space-x-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='male' />
                        </FormControl>
                        <FormLabel className='font-normal'>Male</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='female' />
                        </FormControl>
                        <FormLabel className='font-normal'>Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Major</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select a major' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {major.map((m: { name: string; uuid: string }) => (
                        <div key={m.uuid}>
                          <SelectItem value={m.name}>{m.name}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthplace' //major
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Birth of place</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your Birth of Place'
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
              name='birthdate'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
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
                        fromYear={1990}
                        toYear={new Date().getFullYear() - 1}
                        selected={field.value}
                        onSelect={field.onChange}
                        // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                        className='rounded-md border'
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='recaptcha'
              render={() => (
                <FormItem className='grid gap-2'>
                  <FormControl>
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      ref={recaptchaRef}
                      onChange={handleChange}
                      onExpired={handleExpired}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-6'
              disabled={loading || !form.watch("recaptcha")}
            >
              {loading ? (
                <>
                  <Loader2 className='animate-spin' /> {`Loading...`}
                </>
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
