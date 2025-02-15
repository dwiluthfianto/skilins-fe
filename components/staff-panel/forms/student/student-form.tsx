'use client';

import { SquareUser } from 'lucide-react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { useMajor } from '@/hooks/use-major';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form';

import axios from '@/utils/axios';
import { toast } from '@/hooks/use-toast';
import { mutate } from 'swr';
import Compressor from 'compressorjs';
import { handleAxiosError } from '@/utils/handle-axios-error';

const StudentSchema = z.object({
  image: z.instanceof(File).optional(),
  nis: z.string().min(1, { message: 'NIS is required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
  birthplace: z.string().min(1, { message: 'Birthplace is required.' }),
  birthdate: z.date({ required_error: 'A date of birth is required.' }),
  sex: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Sex is required.' }),
  }),
  major: z.string().min(1, { message: 'Major is required.' }),
});

function StudentForm() {
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      image: undefined,
      nis: '',
      name: '',
      birthplace: '',
      birthdate: undefined,
      sex: 'male',
      major: '',
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      form.reset({
        image: undefined,
        nis: '',
        name: '',
        birthplace: '',
        birthdate: undefined,
        sex: 'male',
        major: '',
      });
    }
  }, [open, form]);

  const [image, setImage] = React.useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Compress image using Compressor.js
      new Compressor(file, {
        quality: 0.6, // Set the quality for compression (0.0 to 1.0)
        maxWidth: 1000,
        maxHeight: 1200,
        success(compressedBlob) {
          // Convert the Blob back to a File
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
            lastModified: Date.now(),
          });
          setImage(compressedFile);
        },
        error(err) {
          console.error('Compression failed:', err.message);
        },
      });
    }
  };

  const { major, isLoading, isError } = useMajor();
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error</h1>;

  async function onSubmit(data: z.infer<typeof StudentSchema>) {
    const formData = new FormData();
    if (image) formData.append('image_url', image);
    formData.append('nis', data.nis);
    formData.append('name', data.name);
    formData.append('birthplace', data.birthplace);
    formData.append('birthdate', data.birthdate.toISOString());
    formData.append('sex', data.sex);
    formData.append('major', data.major);
    formData.append('status', 'true');

    try {
      const { data: studentData } = await axios.post('/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Student Added Successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(studentData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate('/students');

      setOpen(false);
    } catch (error) {
      handleAxiosError(error, 'An error occurred while add the student.');
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquareUser className='mr-2' width={16} /> Add student
        </Button>
      </DialogTrigger>
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
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='image'
              render={() => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Image</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nis'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>NIS</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Name</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthplace'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Birthplace</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthdate'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className='col-span-3'>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sex'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex items-center'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='male' />
                        </FormControl>
                        <FormLabel className='m-0'>Male</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='female' />
                        </FormControl>
                        <FormLabel>Female</FormLabel>
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
                <FormItem className='grid grid-cols-4 items-center gap-2'>
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
                      {major.data?.map((m: { name: string; uuid: string }) => (
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
            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentForm;
