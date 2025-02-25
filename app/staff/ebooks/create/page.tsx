"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, TagInput } from "emblor";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { useTag } from "@/hooks/use-tag";
import { AutoComplete } from "@/components/autocomplete";
import { useCategorySearch } from "@/hooks/use-category";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/autosize-textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { cn } from "@/lib/utils";
import { useGenre } from "@/hooks/use-genre";
import MinimalTiptapOne from "@/components/minimal-tiptap/minimal-tiptap-one";
import FileUploader from "@/components/file-uploader";
import { handleAxiosError } from "@/utils/handle-axios-error";
import {
  MAX_IMAGE_SIZE,
  VALID_IMAGE_TYPES,
  MAX_DOCUMENT_SIZE,
  VALID_DOCUMENT_TYPES,
} from "@/lib/file-validation";
import {
  GuidedFormLayout,
  useGuidedField,
} from "@/components/form-guidance/guided-form-layout";
import { EBOOK_TOOLTIPS } from "@/lib/tooltips";
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
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
  category: z.string().min(1, { message: "Category is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  pages: z
    .number()
    .min(1, { message: "Pages must be greater than 0." })
    .nonnegative(),
  publication: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file && VALID_DOCUMENT_TYPES.includes(file.type), {
      message: "Invalid document file type",
    })
    .refine((file) => file.size <= MAX_DOCUMENT_SIZE, {
      message: "File size must be less than 2MB",
    }),
  isbn: z.string().optional(),
  release_date: z.date(),
  genres: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
});

export default function CreateEbooks() {
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      tags: [],
      category: "",
      pages: 0,
      file: undefined,
      author: "",
      publication: "",
      release_date: new Date(),
      isbn: "",
      genres: [],
    },
  });
  const { autocompleteTags } = useTag();
  const { autocompleteGenres } = useGenre();
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [genres, setGenres] = useState<Tag[]>([]);
  const [activeGenreIndex, setActiveGenreIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const { categories, isLoading } = useCategorySearch(form.watch("category"));

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    const formData = new FormData();
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("genres", JSON.stringify(data.genres));
    formData.append("category_name", data.category);
    formData.append("pages", String(data.pages));
    if (file) formData.append("file", file);
    formData.append("author", data.author);
    formData.append("publication", data.publication || "");
    formData.append("isbn", data.isbn || "");
    formData.append("release_date", String(data.release_date));

    try {
      const { data: ebookData } = await axios.post(
        "/contents/ebooks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success!",
        description: ebookData.message,
      });

      router.push("/staff/ebooks");
    } catch (error) {
      handleAxiosError(error, "An error occurred while create ebook.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentLayout title=''>
      <GuidedFormLayout tooltips={EBOOK_TOOLTIPS}>
        <h1 className='font-semibold mb-4'>Create Ebooks</h1>
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
                            placeholder='New ebook title here...'
                            className='outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden '
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='author'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("author")}>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Name author here...'
                            className='border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none '
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("category")}>
                        <FormControl>
                          <AutoComplete
                            selectedValue={form.watch("category")}
                            onSelectedValueChange={(value) =>
                              field.onChange(value)
                            }
                            searchValue={field.value}
                            onSearchValueChange={field.onChange}
                            items={categories ?? []}
                            isLoading={isLoading}
                            placeholder='Category name here...'
                            emptyMessage='No category found.'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("tags")}>
                        <FormControl>
                          <TagInput
                            {...field}
                            tags={tags}
                            setTags={(newTags) => {
                              setTags(newTags);
                              form.setValue("tags", newTags as [Tag, ...Tag[]]);
                            }}
                            placeholder='Add up to 4 tags...'
                            styleClasses={{
                              input:
                                "w-full h-fit outline-none border-none shadow-none  text-base p-0",
                              inlineTagsContainer: "border-none p-0",
                              autoComplete: {
                                command: "[&>div]:border-none",
                                popoverContent: "p-4",
                                commandList: "list-none",
                                commandGroup: "font-bold",
                              },
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                            enableAutocomplete={true}
                            autocompleteOptions={autocompleteTags}
                            restrictTagsToAutocompleteOptions={false}
                            maxTags={4}
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
                          placeholder='Type your description here...'
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
                    name='tags'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("genres")}>
                        <FormControl>
                          <TagInput
                            {...field}
                            tags={genres}
                            setTags={(newTags) => {
                              setGenres(newTags);
                              form.setValue(
                                "genres",
                                newTags as [Tag, ...Tag[]]
                              );
                            }}
                            placeholder='Add up to 4 genres...'
                            styleClasses={{
                              input:
                                "w-full h-fit outline-none border-none shadow-none  text-base p-0",
                              inlineTagsContainer: "border-none p-0",
                              autoComplete: {
                                command: "[&>div]:border-none",
                                popoverContent: "p-4",
                                commandList: "list-none",
                                commandGroup: "font-bold",
                              },
                            }}
                            activeTagIndex={activeGenreIndex}
                            setActiveTagIndex={setActiveGenreIndex}
                            enableAutocomplete={true}
                            autocompleteOptions={autocompleteGenres}
                            restrictTagsToAutocompleteOptions={false}
                            maxTags={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='isbn'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("isbn")}>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            placeholder='Ebook ISBN here...'
                            className='border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none '
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='publication'
                    render={({ field }) => (
                      <FormItem {...useGuidedField("publication")}>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Publication name here...'
                            className='border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none '
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name='release_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-base text-muted-foreground'>
                          Release date
                        </FormLabel>
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
                              toYear={new Date().getFullYear()}
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
                  <Separator />
                  <FormField
                    control={form.control}
                    name='file'
                    render={({ field }) => (
                      <FileUploader
                        onChange={(file) => {
                          field.onChange(file);
                          setFile(file);
                        }}
                        onPageCountChange={(pages) =>
                          form.setValue("pages", pages ?? 0)
                        }
                        accept='application/pdf'
                        label='Add an Ebook file'
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
      </GuidedFormLayout>
    </ContentLayout>
  );
}
