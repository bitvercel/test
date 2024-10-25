"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import Papa from "papaparse";

interface FileUploadStepProps {
  onUpload: (data: { headers: string[]; rows: string[][] }) => void;
}

export function FileUploadStep({ onUpload }: FileUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        const headers = results.data[0] as string[];
        const rows = results.data.slice(1) as string[][];
        onUpload({ headers, rows });
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors ${
        isDragging ? "border-[#8B5CF6] bg-[#8B5CF6]/5" : "border-gray-200"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Upload className={`h-12 w-12 mb-4 ${isDragging ? "text-[#8B5CF6]" : "text-gray-400"}`} />
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">Drag and drop your CSV file here, or</p>
        <label className="relative">
          <span className="text-sm text-[#8B5CF6] hover:text-[#7C3AED] cursor-pointer">
            browse to upload
          </span>
          <input
            type="file"
            accept=".csv"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Only CSV files are supported</p>
    </div>
  );
}