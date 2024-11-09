import { FC, useRef, useState, useEffect } from "react";
import { FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface FileUploaderProps {
  onChange: (file: File | null) => void;
  onDurationChange?: (duration: number | null) => void;
  onPageCountChange?: (pageCount: number | null) => void;
  accept: string;
  label: string;
  initialFileName?: string;
  initialFileUrl?: string;
}

const FileUploader: FC<FileUploaderProps> = ({
  onChange,
  onDurationChange,
  onPageCountChange,
  accept,
  label,
  initialFileName = "",
  initialFileUrl = "",
}) => {
  const [fileName, setFileName] = useState(initialFileName);
  const [fileUrl, setFileUrl] = useState(initialFileUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFileName(initialFileName);
  }, [initialFileName]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      onChange(selectedFile);

      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(selectedFile);
      setFileUrl(fileUrl);

      // Check if the file is an audio or a PDF
      if (selectedFile.type.startsWith("audio/") && onDurationChange) {
        const audio = new Audio(fileUrl);
        audio.onloadedmetadata = () => {
          const duration = audio.duration;
          onDurationChange(duration); // Pass duration back to parent component
        };
      }
      if (selectedFile.type === "application/pdf" && onPageCountChange) {
        // Load PDF and get page count
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        onPageCountChange(pdf.numPages); // Pass page count back to parent component
      }
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFileUrl("");
    onChange(null);
    if (onDurationChange) onDurationChange(null);
    if (onPageCountChange) onPageCountChange(null);
  };

  return (
    <FormItem>
      <FormControl>
        <Input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </FormControl>
      {fileName ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {initialFileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                {fileName}
              </a>
            ) : (
              fileName
            )}
          </div>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-red-600 hover:text-red-600"
              onClick={handleRemoveFile}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Label onClick={() => fileInputRef.current?.click()} role="button">
          <span className="p-2 border rounded-md hover:bg-slate-50">
            {label}
          </span>
        </Label>
      )}
    </FormItem>
  );
};

export default FileUploader;
