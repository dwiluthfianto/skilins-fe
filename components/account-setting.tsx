"use client";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@/hooks/use-user";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff, PencilRuler, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetFirstLetterStr } from "@/utils/get-first-letter-str";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Cookies from "js-cookie";
import Compressor from "compressorjs";
import { Label } from "./ui/label";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { Loading } from "./loading";
const PasswordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "current password must be filled",
  }),
  newPassword: z.string().min(1, {
    message: "new password must be filled",
  }),
});

const ProfileSchema = z.object({
  profile: z.instanceof(File).optional(),
});

export default function AccountSetting() {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const formProfile = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      profile: undefined,
    },
  });
  const { user, isLoading, mutate } = useUser();
  const [see, setSee] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, setImageUrl] = useState<string | null>(
    user?.data?.profile || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1400,
        maxHeight: 1600,
        success(compressedBlob) {
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
            lastModified: Date.now(),
          });
          setImage(compressedFile);

          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setImageUrl(event.target.result as string);
              onSubmitProfile(compressedFile);
            }
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Compression failed:", err.message);
        },
      });
    }
  };

  async function onSubmitProfile(imageFile: File) {
    const formData = new FormData();
    formData.append("profile", imageFile);

    try {
      const { data: userData } = await axios.post(
        `/users/update-profile/${user?.data?.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Success!",
        description: <h2>{userData.message}</h2>,
      });

      router.refresh();
      mutate(); // Pastikan mutate di sini agar perubahan segera tampil
    } catch (error) {
      handleAxiosError(error, "An error occurred while change profile.");
    }
  }

  async function onSubmitPassword(data: z.infer<typeof PasswordSchema>) {
    const payload = {
      email: user.data?.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      const { data: userData } = await axios.post(
        "/auth/change-password",
        payload
      );
      toast({
        title: "Password changed successfully!",
        description: <p>{JSON.stringify(userData.message, null, 2)}</p>,
      });

      form.reset({
        currentPassword: "",
        newPassword: "",
      });

      mutate();
    } catch (error) {
      handleAxiosError(error, "An error occurred while change password.");
    }
  }
  async function onDelete() {
    try {
      const { data: userData } = await axios.post(`/users/remove-account`);
      toast({
        title: "Delete account successfully!",
        description: <p>{JSON.stringify(userData.message, null, 2)}</p>,
      });

      Cookies.remove("accessToken");
      Cookies.remove("userRole");
      router.push("/");
      mutate(null, false);
    } catch (error) {
      handleAxiosError(error, "An error occurred while delete account.");
    }
  }

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <Loading />;
  return (
    <div className='md:container '>
      <Card>
        <CardContent>
          <div className='pt-4'>
            <h1 className='py-2 text-2xl font-semibold'>Account settings</h1>
            <p className='font- text-slate-600'>
              Easily manage your preferences and keep your account secure.
            </p>
          </div>
          <hr className='mt-4 mb-8' />
          <p className='py-2 text-xl font-semibold'>Profile</p>
          <div className='flex flex-col sm:flex-row sm:item'>
            <Label htmlFor='profile'>
              <div className='relative w-[150px]'>
                <AspectRatio ratio={1 / 1}>
                  <Avatar className='w-full h-full'>
                    <AvatarImage
                      key={user?.data?.profile}
                      src={`${user?.data?.profile}`}
                      alt='@shadcn'
                      className='object-cover object-center'
                    />
                    <AvatarFallback>
                      {GetFirstLetterStr(user?.data?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </AspectRatio>
                <span className='absolute bottom-0 end-0 flex p-1 rounded-md transform translate-y-1 translate-x-1 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center '>
                  <PencilRuler width={18} className='mr-2' /> Edit
                </span>
                <Form {...formProfile}>
                  <form>
                    <FormField
                      control={formProfile.control}
                      name='profile'
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type='file'
                              accept='image/*'
                              id='profile'
                              onChange={handleImageChange}
                              className='w-full flex-shrink hidden'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </Label>
          </div>
          <hr className='mt-4 mb-8' />
          <p className='py-2 text-xl font-semibold'>Email Address</p>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-gray-600'>
              Your email address is <strong>{user?.data?.email}</strong>
            </p>
          </div>
          <hr className='mt-4 mb-8' />
          <p className='py-2 text-xl font-semibold'>Password</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitPassword)}>
              <div className='flex items-center'>
                <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3'>
                  <FormField
                    control={form.control}
                    name='currentPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='current-password'>
                          <span className='text-sm text-gray-500'>
                            Current Password
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={see ? "text" : "password"}
                            id='current-password'
                            className='w-full flex-shrink'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='new-password'>
                          <span className='text-sm text-gray-500'>
                            New Password
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={see ? "text" : "password"}
                            id='new-password'
                            className='w-full flex-shrink'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {see ? (
                  <Eye
                    onClick={() => setSee(false)}
                    className='cursor-pointer mt-5 ml-2 underline decoration-2'
                  />
                ) : (
                  <EyeOff
                    onClick={() => setSee(true)}
                    className='cursor-pointer mt-5 ml-2 underline decoration-2'
                  />
                )}
              </div>
              <p className='mt-2'>
                {"Can't remember your current password."}
                <Link
                  className='text-sm font-semibold text-blue-600 ml-1 underline decoration-2'
                  href='/auth/reset-password'
                >
                  Recover Account
                </Link>
              </p>
              <Button variant='default' className='mt-2'>
                Save Password
              </Button>
            </form>
          </Form>
          <hr className='mt-4 mb-8' />

          <div className='mb-10'>
            <p className='py-2 text-xl font-semibold'>Delete Account</p>
            <p className='inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600'>
              <TriangleAlert width={18} className='mr-2' />
              Proceed with caution
            </p>
            <p className='mt-2'>
              Make sure you have taken backup of your account in case you ever
              need to get access to your data. We will completely wipe your
              data. There is no way to access your account after this action.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='mt-2'>
                  Continue with deletion
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant={"destructive"} onClick={() => onDelete()}>
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
