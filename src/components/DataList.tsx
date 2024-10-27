import React from 'react';

interface DataListProps {
  items: string[];
  className?: string;
}

export function DataList({ items, className = '' }: DataListProps) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}