/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/imageUploader";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AutosizeTextarea } from "@/components/autosize-textarea";
import MinimalTiptapOne from "@/components/minimal-tiptap/minimal-tiptap-one";
import { ContentLayout } from "@/components/user-panel/content-layout";
import FileUploader from "@/components/file-uploader";
import { Input } from "@/components/ui/input";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { PRAKERIN_TOOLTIPS } from "@/lib/tooltips";
import {
  GuidedFormLayout,
  useGuidedField,
} from "@/components/form-guidance/guided-form-layout";
import {
  MAX_IMAGE_SIZE,
  VALID_IMAGE_TYPES,
  VALID_DOCUMENT_TYPES,
  MAX_DOCUMENT_SIZE,
} from "@/lib/file-validation";
const ContentSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be longer than or equal to 5 characters" }),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file && VALID_IMAGE_TYPES.includes(file.type), {
      message: "Invalid image file type",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: "File size must be less than 2MB",
    }),
  description: z.string().min(1, { message: "Description is required." }),
  pages: z
    .number()
    .min(1, { message: "Duration must be greater than 0." })
    .nonnegative(),
  file: z
    .instanceof(File)
    .refine((file) => file && VALID_DOCUMENT_TYPES.includes(file.type), {
      message: "Invalid file type",
    })
    .refine((file) => file.size <= MAX_DOCUMENT_SIZE, {
      message: "File size must be less than 5MB",
    }),
});

export default function PrakerinCreate() {
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      pages: 0,
      file: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    const formData = new FormData();
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("pages", String(data.pages));
    if (file) formData.append("file", file);

    try {
      const { data: contentData } = await axios.post(
        "/contents/prakerin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success!",
        description: contentData.message,
      });

      router.push(`/myworks/prakerin`);
    } catch (error) {
      handleAxiosError(error, "An error occurred while submit the prakerin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentLayout title=''>
      <GuidedFormLayout tooltips={PRAKERIN_TOOLTIPS}>
        <div className='max-w-4xl mx-auto'>
          <h1 className='font-semibold mb-4'>Create Prakerin</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardContent className='p-0'>
                  <div className='m-8 space-y-4'>
                    <FormField
                      control={form.control}
                      name='thumbnail'
                      render={() => (
                        <ImageUploader
                          onChange={(file) =>
                            file && form.setValue("thumbnail", file)
                          }
                          ratioImage={3 / 4}
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AutosizeTextarea
                              {...field}
                              {...useGuidedField("title")}
                              placeholder='New prakerin title here...'
                              className='outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden '
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("description")}>
                        <FormControl>
                          <MinimalTiptapOne
                            {...field}
                            className='w-full'
                            editorContentClassName='px-8 py-4 shadow-none'
                            output='html'
                            placeholder='Type your prakerin description here...'
                            autofocus={true}
                            editable={true}
                            editorClassName='focus:outline-none'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='m-8 space-y-4'>
                    <FormField
                      control={form.control}
                      name='file'
                      render={({ field }) => (
                        <FileUploader
                          onChange={(file) => {
                            field.onChange(file);
                            setFile(file);
                          }}
                          accept='application/pdf'
                          onPageCountChange={(pages) =>
                            form.setValue("pages", pages ?? 0)
                          }
                          label='Add an pdf file'
                          initialFileName={field.value ? field.value.name : ""}
                          initialFileUrl={
                            field.value ? URL.createObjectURL(field.value) : ""
                          }
                        />
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name='pages'
                      render={({ field }) => (
                        <FormItem {...useGuidedField("pages")}>
                          <FormLabel className='font-normal text-base text-muted-foreground'>
                            Pages
                          </FormLabel>
                          <FormControl>
                            <Input
                              value={field.value}
                              type='text'
                              readOnly
                              className='border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none '
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button className='mt-6' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin' /> {`Publishing...`}
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </GuidedFormLayout>
    </ContentLayout>
  );
}
