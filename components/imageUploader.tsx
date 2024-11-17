// src/components/ImageUploader.tsx
import { FC, useEffect, useRef, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
  ratioImage: number;
  initialImage?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onChange,
  ratioImage,
  initialImage = null,
}) => {
  const [preview, setPreview] = useState(initialImage);
  const { imageUrl, handleImageChange, removeImage } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    removeImage();
    setPreview(null);
    onChange(null);
  };

  return (
    <FormItem>
      <FormControl>
        <Input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />
      </FormControl>
      {preview ? (
        <div className="space-y-4">
          <div className="max-w-96 h-full">
            <AspectRatio ratio={ratioImage}>
              <Image
                key={preview}
                src={preview}
                alt="Thumbnail"
                className="object-cover"
                fill
              />
            </AspectRatio>
          </div>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()} // Trigger file input
            >
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-red-600 hover:text-red-600"
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Label onClick={() => fileInputRef.current?.click()} role="button">
          <span className="p-2 border rounded-md hover:bg-slate-50">
            Add a cover image
          </span>
        </Label>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default ImageUploader;
