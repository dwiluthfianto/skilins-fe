interface TooltipContent {
  title: string;
  items: string[];
}

export const VIDEO_PODCAST_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
      'Make it specific enough to understand the content',
      'Use keywords where appropriate for better search visibility',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 4:3',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  tags: {
    title: 'Adding Tags',
    items: [
      'Add up to 4 relevant tags',
      'Use specific tags to help people find your content',
      'Popular tags will show up in autocomplete',
    ],
  },
  category: {
    title: 'Selecting a Category',
    items: [
      'Choose the most relevant category for your content',
      'This helps viewers find your video more easily',
      'Categories help organize your content',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your video',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  genres: {
    title: 'Adding Genres',
    items: [
      'Add up to 4 relevant genres',
      'Use specific genres to help people find your content',
      'Popular genres will show up in autocomplete',
    ],
  },
  link: {
    title: 'Video URL',
    items: [
      'Paste your YouTube video URL',
      'Make sure the video is publicly accessible',
      'Only YouTube URLs are supported at this time',
    ],
  },
};

export const AUDIO_PODCAST_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
      'Make it specific enough to understand the content',
      'Use keywords where appropriate for better search visibility',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 1:1',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  tags: {
    title: 'Adding Tags',
    items: [
      'Add up to 4 relevant tags',
      'Use specific tags to help people find your content',
      'Popular tags will show up in autocomplete',
    ],
  },
  category: {
    title: 'Selecting a Category',
    items: [
      'Choose the most relevant category for your content',
      'This helps viewers find your audio more easily',
      'Categories help organize your content',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your audio',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  genres: {
    title: 'Adding Genres',
    items: [
      'Add up to 4 relevant genres',
      'Use specific genres to help people find your content',
      'Popular genres will show up in autocomplete',
    ],
  },
  duration: {
    title: 'Audio Duration',
    items: ['Enter the duration of your audio in seconds'],
  },
  file: {
    title: 'Audio File',
    items: ['Upload your audio file', 'Supported formats: MP3, WAV, M4A'],
  },
};

export const PRAKERIN_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 3:4',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your prakerin',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  file: {
    title: 'Prakerin File',
    items: ['Upload your prakerin file', 'Supported formats: PDF'],
  },
  pages: {
    title: 'Prakerin Pages',
    items: ['Enter the number of pages in your prakerin'],
  },
};

export const STORY_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 3:4',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your story',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  tags: {
    title: 'Adding Tags',
    items: [
      'Add up to 4 relevant tags',
      'Use specific tags to help people find your content',
      'Popular tags will show up in autocomplete',
    ],
  },
  category: {
    title: 'Selecting a Category',
    items: [
      'Choose the most relevant category for your story',
      'This helps viewers find your story more easily',
      'Categories help organize your content',
    ],
  },
  genres: {
    title: 'Adding Genres',
    items: [
      'Add up to 4 relevant genres',
      'Use specific genres to help people find your content',
      'Popular genres will show up in autocomplete',
    ],
  },
  order: {
    title: 'Episode Number',
    items: ['Enter the episode number of your story'],
  },
  content: {
    title: 'Episode Content',
    items: ['Enter the content of your story'],
  },
};

export const BLOG_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 16:9',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your blog',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  tags: {
    title: 'Adding Tags',
    items: [
      'Add up to 4 relevant tags',
      'Use specific tags to help people find your content',
      'Popular tags will show up in autocomplete',
    ],
  },
  category: {
    title: 'Selecting a Category',
    items: [
      'Choose the most relevant category for your blog',
      'This helps viewers find your blog more easily',
      'Categories help organize your content',
    ],
  },
};

export const EBOOK_TOOLTIPS: { [key: string]: TooltipContent } = {
  title: {
    title: 'Writing a Great Title',
    items: [
      'Think of your title as a super short (but compelling!) description',
      'Make it specific enough to understand the content',
      'Use keywords where appropriate for better search visibility',
    ],
  },
  thumbnail: {
    title: 'Choosing a Thumbnail',
    items: [
      'Use a clear, high-quality image',
      'Recommended ratio is 3:4',
      'Keep file size under 2MB',
      'Supported formats: PNG, JPEG, JPG',
    ],
  },
  description: {
    title: 'Writing a Good Description',
    items: [
      'Provide clear and detailed information about your ebook',
      'Include relevant keywords naturally',
      'You can use basic formatting for better readability',
    ],
  },
  tags: {
    title: 'Adding Tags',
    items: [
      'Add up to 4 relevant tags',
      'Use specific tags to help people find your content',
      'Popular tags will show up in autocomplete',
    ],
  },
  genres: {
    title: 'Adding Genres',
    items: [
      'Add up to 4 relevant genres',
      'Use specific genres to help people find your content',
      'Popular genres will show up in autocomplete',
    ],
  },
  category: {
    title: 'Selecting a Category',
    items: [
      'Choose the most relevant category for your ebook',
      'This helps viewers find your ebook more easily',
      'Categories help organize your content',
    ],
  },
  author: {
    title: 'Author',
    items: ['Enter the author of your ebook'],
  },
  pages: {
    title: 'Pages',
    items: ['Enter the number of pages in your ebook'],
  },
  publication: {
    title: 'Publication',
    items: ['Enter the publication of your ebook'],
  },
  isbn: {
    title: 'ISBN',
    items: ['Enter the ISBN of your ebook'],
  },
  release_date: {
    title: 'Release Date',
    items: ['Enter the release date of your ebook'],
  },
  file: {
    title: 'Ebook File',
    items: ['Upload your ebook file', 'Supported formats: PDF'],
  },
};
export type { TooltipContent };
