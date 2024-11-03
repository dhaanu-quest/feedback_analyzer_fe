import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import { APIResponse } from '../types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onUploadSuccess: (response: APIResponse) => void;
}

export function FileUpload({ onFileSelect, onUploadSuccess }: FileUploadProps) {
  const API_BASE_URL = 'http://localhost:8080/api/feedbacks';

  const authString = localStorage.getItem('auth');
  const auth = authString ? JSON.parse(authString) : { email: '', userId: '' };
  const userId = auth.userId || '';

  const handleFileUpload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post(`${API_BASE_URL}/csv/upload-feedback?`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data.data);
      onUploadSuccess(JSON.parse(response.data.data));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);


  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
      handleFileUpload(file);
    }
  }, [onFileSelect, handleFileUpload]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      handleFileUpload(file);
    }
  }, [onFileSelect, handleFileUpload]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-2xl mx-auto p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-blue-500 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Drop your CSV file here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg px-4 py-2 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Select File
        </label>
      </div>
    </div>
  );
}