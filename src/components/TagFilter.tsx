import { useSearchParams } from 'react-router-dom';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange?: (tags: string[]) => void;
}

export function TagFilter({ allTags, selectedTags, onTagsChange }: TagFilterProps) {
  const [, setSearchParams] = useSearchParams();

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    if (onTagsChange) {
      onTagsChange(newTags);
    } else {
      const params = new URLSearchParams();
      newTags.forEach(t => params.append('tag', t));
      setSearchParams(params);
    }
  };

  const clearTags = () => {
    if (onTagsChange) {
      onTagsChange([]);
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {tag}
              {isSelected && (
                <span className="ml-1.5 text-xs">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <button
          onClick={clearTags}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          清除筛选
        </button>
      )}
    </div>
  );
}
