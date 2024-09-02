import { useState } from 'react';

interface TagSelectProps {
  contentTypes: any[];
  onChange: (tag: string) => void;
}

export default function TagSelect({ contentTypes, onChange }: TagSelectProps) {    
  return (
    <select onChange={(e) => onChange(e.target.value)} className="mb-4 p-2 border rounded">
      <option value="">All Tags</option>
      {contentTypes && contentTypes.length && contentTypes.map(tag => (
        <option key={tag._id} value={tag._id}>
          {tag}
        </option>
      ))}
    </select>
  );
}
