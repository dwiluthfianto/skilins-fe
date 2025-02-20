export function convertToEmbedLink(youtubeUrl: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+)/;
  const match = youtubeUrl.match(regex);

  if (match && (match[1] || match[2])) {
    const videoId = match[1] || match[2];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}
