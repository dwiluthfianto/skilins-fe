/* eslint-disable react-hooks/rules-of-hooks */
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/imageUploader";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTag } from "@/hooks/use-tag";
import { AutoComplete } from "@/components/autocomplete";
import { useCategorySearch } from "@/hooks/use-category";
import { AutosizeTextarea } from "@/components/autosize-textarea";
import { useGenre } from "@/hooks/use-genre";
import MinimalTiptapOne from "@/components/minimal-tiptap/minimal-tiptap-one";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { MAX_IMAGE_SIZE, VALID_IMAGE_TYPES } from "@/lib/file-validation";
import {
  GuidedFormLayout,
  useGuidedField,
} from "@/components/form-guidance/guided-form-layout";
import { STORY_TOOLTIPS } from "@/lib/tooltips";
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
  genres: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
});

export default function StoryCreate() {
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      genres: [],
      category: "",
      tags: [],
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

  const { categories, isLoading } = useCategorySearch(form.watch("category"));

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    const formData = new FormData();
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genres", JSON.stringify(data.genres));
    formData.append("category_name", data.category);
    formData.append("tags", JSON.stringify(data.tags));

    try {
      const { data: contentData } = await axios.post(
        "/contents/stories",
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

      router.push(`/myworks/stories`);
    } catch (error) {
      handleAxiosError(error, "An error occurred while submit the story.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentLayout title=''>
      <GuidedFormLayout tooltips={STORY_TOOLTIPS}>
        <h1 className='font-semibold mb-4'>Create Story</h1>
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
                        ratioImage={1 / 1}
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
                            placeholder='New story title here...'
                            className='outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden '
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
                          placeholder='Type your synopsis here...'
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
