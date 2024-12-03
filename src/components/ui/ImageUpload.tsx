import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './Button';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onClear: () => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onClear,
  label
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Logo"
              className="w-32 h-32 object-contain border rounded-lg bg-white dark:bg-gray-800"
            />
            <button
              onClick={onClear}
              className="absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400"
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center px-2">
              Cliquez pour ajouter un logo
            </span>
          </div>
        )}
        
        {value && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => inputRef.current?.click()}
          >
            Changer le logo
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Format recommandé : PNG ou JPG, max 1MB
      </p>
    </div>
  );
};