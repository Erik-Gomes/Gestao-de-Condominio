'use client'
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomSelect({ label, name, options, defaultValue, value, onChange }: any) {
  
  const [selected, setSelected] = useState(value || defaultValue || "");
  
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    if (onChange) {
      onChange({
        target: {
          name: name,
          value: option
        }
      });
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block mb-1 text-stone-700 text-sm font-medium">
        {label}
      </label>

      {/* Input hidden mantém o funcionamento de FormData se precisar */}
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center border rounded-md px-3 py-2 bg-white text-left transition-all h-10
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-stone-300 hover:border-stone-400'}
        `}
      >
        {/* Lógica para exibir placeholder se estiver vazio */}
        <span className={`truncate ${selected ? 'text-stone-700' : 'text-stone-400'}`}>
          {selected || "Selecione..."}
        </span>
        
        <FaChevronDown className={`text-xs text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option: string) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer text-sm transition-colors
                ${selected === option 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}
              `}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}