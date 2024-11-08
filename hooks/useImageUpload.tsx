import { useState } from "react";
import Compressor from "compressorjs";

export function useImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 1980,
      maxHeight: 1080,
      success(compressedBlob) {
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });
        setImage(compressedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImageUrl(event.target.result as string);
          }
        };
        reader.readAsDataURL(compressedFile);
      },
      error(err) {
        console.error("Compression failed:", err.message);
      },
    });
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  return {
    image,
    imageUrl,
    handleImageChange,
    removeImage,
  };
}
