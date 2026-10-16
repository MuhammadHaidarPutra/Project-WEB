'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './Button';
import toast from 'react-hot-toast';

export interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  helperText?: string;
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  label = 'Upload Gambar',
  helperText = 'Format JPG, PNG, WEBP (maks. 5MB)',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images: string[] = Array.isArray(value)
    ? value
    : value
    ? [value]
    : [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} melebihi batas 5MB`);
        continue;
      }

      // Validate type
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} bukan format gambar`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Gagal mengunggah gambar');
        const data = await res.json();
        uploadedUrls.push(data.url);
      } catch (err: any) {
        toast.error(`Gagal upload: ${err.message || 'Error server'}`);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (uploadedUrls.length > 0) {
      if (multiple) {
        onChange([...images, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
      toast.success('Gambar berhasil diunggah!');
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (multiple) {
      onChange(images.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Upload ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1.5 right-1.5 p-1 bg-rose-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button/Zone */}
      {(!images.length || multiple) && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple={multiple}
            onChange={handleUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-500 hover:bg-amber-50/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
                <p className="text-xs text-slate-500 font-medium">
                  Mengunggah gambar...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-slate-100 text-slate-600 rounded-full mb-2">
                  <Upload className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-0.5">
                  Klik untuk unggah {multiple ? 'gambar-gambar' : 'gambar'}
                </p>
                <p className="text-xs text-slate-400">{helperText}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
