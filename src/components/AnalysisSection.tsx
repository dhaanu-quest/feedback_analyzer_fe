import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AnalysisSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AnalysisSection({ title, children, isOpen, onToggle }: AnalysisSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
}