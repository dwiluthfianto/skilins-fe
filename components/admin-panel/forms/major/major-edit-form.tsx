"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { useMajor } from "@/hooks/use-major";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";

import axios from "../../../../utils/axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import Image from "next/image";
import { AspectRatio } from "../../../ui/aspect-ratio";

const StudentSchema = z.object({
  image: z.instanceof(File).optional(),
  nis: z.number().min(1, { message: "NIS is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  birthplace: z.string().min(1, { message: "Birthplace is required." }),
  birthdate: z.date({ required_error: "A date of birth is required." }),
  sex: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Sex is required." }),
  }),
  major: z.string().min(1, { message: "Major is required." }),
});

function StudentEditForm({ isEditDialogOpen, setIsEditDialogOpen, student }) {
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      image: undefined,
      nis: parseInt(student?.nis, 10),
      name: student?.name || "",
      birthplace: student?.birthplace || "",
      birthdate: student?.birthdate ? new Date(student.birthdate) : undefined,
      sex: student?.sex || "male",
      major: student?.major || "",
    },
  });

  React.useEffect(() => {
    if (!isEditDialogOpen) {
      form.reset({
        image: undefined,
        nis: parseInt(student?.nis, 10),
        name: student?.name || "",
        birthplace: student?.birthplace || "",
        birthdate: student?.birthdate ? new Date(student.birthdate) : undefined,
        sex: student?.sex || "male",
        major: student?.major || "",
      });
      setImageUrl(student?.image_url || null); // Reset image URL
    }
  }, [isEditDialogOpen, student, form]);

  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    student?.image_url || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file); // Simpan file gambar ke state

      // Gunakan FileReader untuk menampilkan preview gambar baru
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string); // Set preview URL gambar baru
        }
      };
      reader.readAsDataURL(file); // Baca file gambar sebagai data URL
    }
  };

  const { major, isLoading, isError } = useMajor();
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error</h1>;

  async function onSubmit(data: z.infer<typeof StudentSchema>) {
    const formData = new FormData();
    if (image) {
      formData.append("image_url", image);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }
    formData.append("nis", String(data.nis));
    formData.append("name", data.name);
    formData.append("birthplace", data.birthplace);
    formData.append("birthdate", data.birthdate.toISOString());
    formData.append("sex", data.sex);
    formData.append("major", data.major);
    formData.append("status", "true");

    try {
      const { data: studentData } = await axios.patch(
        `/students/${student?.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Student Updated Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(studentData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate("/students");

      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while update the student.",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add student</DialogTitle>
          <DialogDescription>
            {"Add new data student here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {imageUrl && (
              <div className="grid grid-cols-4 items-center gap-2">
                <div className="col-span-1">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={imageUrl}
                      alt="Current student image"
                      className="object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Image</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input type="file" onChange={handleFileChange} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>NIS</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Name</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthplace"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Birthplace</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Date of birth</FormLabel>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Sex</FormLabel>
                  <div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center"
                      >
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="m-0">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel>Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Major</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a major" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {major.data?.map(
                          (m: { name: string; uuid: string }) => (
                            <div key={m.uuid}>
                              <SelectItem value={m.name}>{m.name}</SelectItem>
                            </div>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentEditForm;
