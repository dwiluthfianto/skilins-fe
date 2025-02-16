/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '../../../../utils/axios';
import Image from 'next/image';
import { Metadata } from 'next';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { format } from 'date-fns';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await axios.get(`/contents/blogs/${params.slug}`);
  const blog = res.data.data;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.thumbnail,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${blog.slug}`,
    },
  };
}

export default async function EbookDetail({ params }: any) {
  const { slug } = params;

  const res = (await axios.get(`/contents/blogs/${slug}`)).data.data;

  return (
    <ContentLayout title=''>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='relative w-full h-96'>
          <Image
            src={res.thumbnail} // Ganti dengan gambar yang sesuai
            alt='Blog Header'
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
        </div>
        <div className='mt-6'>
          <p className='text-gray-500 text-sm'>
            Published in <span className='font-semibold'>Skilins Blog</span>
          </p>
          <h1 className='text-3xl font-bold mt-2'>{res.title}</h1>

          <div className='flex items-center mt-4 text-gray-500 text-sm'>
            <span className='font-semibold'>By {res.creator}</span>
            <span className='mx-2'>•</span>
            <span>{format(res.created_at, 'PPP')}</span>
          </div>
        </div>
        <div className='mt-6 text-gray-700'>
          <MinimalTiptapPreview content={res.description} />
        </div>
        <div className='mt-8'>
          {res.latest_blogs.length > 0 ? (
            <>
              <h3 className='font-semibold'>LATEST BLOGS</h3>
              {res.latest_blogs.map((item: any) => (
                <div className='flex items-center mt-2'>
                  <Image
                    src={item.thumbnail} // Ganti dengan gambar yang sesuai
                    alt='Latest News'
                    width={50}
                    height={50}
                    className='rounded'
                  />
                  <div className='ml-4'>
                    <h4 className='text-sm font-semibold'>{item.title}</h4>
                    <p className='text-xs text-gray-600'>{item.description}</p>
                    <a
                      href={`/blogs/${item.slug}`}
                      className='text-blue-500 text-xs'
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
