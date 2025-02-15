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

export type { TooltipContent };
