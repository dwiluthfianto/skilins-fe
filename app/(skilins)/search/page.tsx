'use client';

import { useState, useEffect } from 'react';
import { ContentLayout } from '@/components/user-panel/content-layout';
import { AudioCarousel } from '@/components/user-panel/ui/audio-carousel';
import { BlogCarousel } from '@/components/user-panel/ui/blog-carousel';
import { EbookCarousel } from '@/components/user-panel/ui/ebook-carousel';
import { StoryCarousel } from '@/components/user-panel/ui/stories-carousel';
import { VideoCarousel } from '@/components/user-panel/ui/video-carousel';
import axios from '@/utils/axios';
import { useSearchParams } from 'next/navigation';

interface SearchResults {
  contents: any[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults>({
    contents: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResults = async (searchQuery: string) => {
    if (!searchQuery) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/contents/search?query=${encodeURIComponent(searchQuery)}`);
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currentQuery = searchParams.get('q');
    if (currentQuery) {
      fetchSearchResults(currentQuery);
    }
  }, [searchParams]);

  // Memisahkan konten berdasarkan tipe
  const filterContentsByType = (type: string) => {
    return searchResults.contents.filter(content => content.type === type);
  };

  const ebooks = filterContentsByType('ebook');
  const stories = filterContentsByType('story');
  const audios = filterContentsByType('audio');
  const videos = filterContentsByType('video');
  const blogs = filterContentsByType('blog');

  return (
    <ContentLayout title="Search">

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {/* Content Carousels */}
      {!isLoading && searchResults.contents.length > 0 && (
        <>
          {ebooks.length > 0 && <EbookCarousel data={ebooks} />}
          {stories.length > 0 && <StoryCarousel data={stories} />}
          {audios.length > 0 && <AudioCarousel data={audios} />}
          {videos.length > 0 && <VideoCarousel data={videos} />}
          {blogs.length > 0 && <BlogCarousel data={blogs} />}
        </>
      )}

      {/* No Results Message */}
      {!isLoading && searchParams.get('q') && searchResults.contents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada hasil yang ditemukan untuk "{searchParams.get('q')}"
        </div>
      )}
    </ContentLayout>
  );
}