'use client';

import { useState } from "react";

interface ChipOption {
  id: string;
  label: string;
  value: string;
}

interface ChipsProps {
  options: ChipOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Chips({ options, defaultValue, onChange, className = "" }: ChipsProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value || '');

  const handleChipClick = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="flex space-x-2 min-w-max p-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleChipClick(option.value)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedValue === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 