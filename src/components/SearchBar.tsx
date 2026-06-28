import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchArticles } from '@/lib/articles';
import type { ArticleFrontmatter } from '@/lib/articles';

interface SearchBarProps {
  onResult?: (results: ArticleFrontmatter[]) => void;
}

export function SearchBar({ onResult }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleFrontmatter[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const doSearch = useCallback((q: string) => {
    setQuery(q);
    if (q.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      onResult?.([]);
      return;
    }
    const r = searchArticles(q);
    setResults(r);
    setShowResults(true);
    onResult?.(r);
  }, [onResult]);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      doSearch(e.detail);
    };
    window.addEventListener('blog-search' as any, handler);
    return () => window.removeEventListener('blog-search' as any, handler);
  }, [doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={query}
          onChange={e => doSearch(e.target.value)}
          onFocus={() => query.trim().length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="搜索文章..."
          className="w-full px-4 py-2 pl-9 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
        />
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      {/* Dropdown results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {results.slice(0, 8).map(article => (
            <a
              key={article.slug}
              href={`/article/${article.slug}`}
              className="block px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 no-underline"
              onMouseDown={e => e.preventDefault()}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{article.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                {article.summary}
              </div>
            </a>
          ))}
          {results.length > 8 && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800">
              还有 {results.length - 8} 条结果，按 Enter 查看全部
            </div>
          )}
        </div>
      )}
    </div>
  );
}
