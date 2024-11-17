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
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/imageUploader";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTag } from "@/hooks/use-tag";
import { AutoComplete } from "@/components/autocomplete";
import { useCategorySearch } from "@/hooks/use-category";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/autosize-textarea";
import { useGenre } from "@/hooks/use-genre";
import MinimalTiptapOne from "@/components/minimal-tiptap/minimal-tiptap-one";
import { useUser } from "@/hooks/use-user";
import { ContentLayout } from "@/components/user-panel/content-layout";
const ContentSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be longer than or equal to 5 characters" }),
  thumbnail: z
    .instanceof(File)
    .refine(
      (file) =>
        file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      { message: "Invalid image file type" }
    ),
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
  file: z.string().url().min(1, { message: "Video URL is required" }),
  genres: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
});

export default function VideoCreate() {
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      genres: [],
      category: "",
      file: undefined,
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

  const { user } = useUser();

  async function onSubmit(data: z.infer<typeof ContentSchema>) {
    setLoading(true);

    const formData = new FormData();

    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genres", JSON.stringify(data.genres));
    formData.append("category_name", data.category);
    formData.append("file_url", data.file);
    if (user) formData.append("creator_uuid", user?.data.uuid);
    formData.append("tags", JSON.stringify(data.tags));

    try {
      const { data: contentData } = await axios.post(
        "/contents/videos",
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

      router.push(`/myworks/video-podcasts`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error!",
          description:
            error?.response.data.message ||
            error?.response.data.error ||
            "An error occurred while submit the competition.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentLayout title="">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-semibold mb-4">Create video</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-0">
                <div className="m-8 space-y-4">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                      <ImageUploader
                        onChange={(file) =>
                          file && form.setValue("thumbnail", file)
                        }
                        ratioImage={4 / 3}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AutosizeTextarea
                            {...field}
                            placeholder="New video title here..."
                            className="outline-none w-full text-4xl p-0 border-none  shadow-none focus-visible:ring-0  font-bold placeholder:text-slate-700 h-full resize-none overflow-hidden "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
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
                            placeholder="Category name here..."
                            emptyMessage="No category found."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagInput
                            {...field}
                            tags={tags}
                            setTags={(newTags) => {
                              setTags(newTags);
                              form.setValue("tags", newTags as [Tag, ...Tag[]]);
                            }}
                            placeholder="Add up to 4 tags..."
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
                            restrictTagsToAutocompleteOptions={true}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MinimalTiptapOne
                          {...field}
                          className="w-full"
                          editorContentClassName="px-8 py-4 shadow-none"
                          output="html"
                          placeholder="Type your description here..."
                          autofocus={true}
                          editable={true}
                          editorClassName="focus:outline-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="m-8 space-y-4">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
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
                            placeholder="Add up to 4 genres..."
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
                            restrictTagsToAutocompleteOptions={true}
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
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Youtube Video URL here"
                            type="text"
                            className="border-none outline-none shadow-none text-base p-0 focus-visible:ring-0 focus:border-none "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Button className="mt-6" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> {`Publishing...`}
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
