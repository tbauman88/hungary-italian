import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetAllIngredientsQuery } from '../generated/graphql';

export const IngredientTypeahead = ({
  value,
  onChange,
  placeholder = 'Type or select an ingredient',
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
}) => {
  const { data, loading } = useGetAllIngredientsQuery();
  const [inputValue, setInputValue] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allIngredients = data?.ingredients || [];
  const filtered = useMemo(() => {
    const term = inputValue.trim().toLowerCase();
    return allIngredients.filter((i: { name: string }) => (i.name || '').toLowerCase().includes(term));
  }, [allIngredients, inputValue]);

  const showCreate = inputValue.trim() && !filtered.some((i: { name: string }) => (i.name || '').toLowerCase() === inputValue.trim().toLowerCase());

  const handleSelect = (name: string) => {
    onChange(name);
    setInputValue(name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg bg-white pr-12 border-gray-300 hover:border-gray-400 capitalize`}
        />
        {inputValue && (
          <button
            type="button"
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              setInputValue('');
              onChange('');
            }}
            tabIndex={-1}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
        {isOpen && (inputValue || filtered.length > 0 || showCreate) && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-gray-500 text-center">Loading...</div>
            ) : (
              <>
                {filtered.map((ingredient: { id: string; name: string }) => (
                  <button
                    key={ingredient.id}
                    type="button"
                    className={`w-full text-left px-4 py-3 hover:bg-primary-50 focus:bg-primary-100 transition-colors ${(ingredient.name || '').toLowerCase() === (value || '').toLowerCase() ? 'bg-primary-100 text-primary-700' : ''}`}
                    onClick={() => handleSelect(ingredient.name)}
                  >
                    <span className="capitalize">{ingredient.name}</span>
                  </button>
                ))}
                {showCreate && (
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-green-50 focus:bg-green-100 text-green-700 font-semibold"
                    onClick={() => handleSelect(inputValue.trim())}
                  >
                    Create "{inputValue.trim()}"
                  </button>
                )}
                {!loading && filtered.length === 0 && !showCreate && (
                  <div className="px-4 py-3 text-gray-400">No ingredients found</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 
