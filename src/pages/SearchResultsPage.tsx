import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '@/components/ArticleCard';
import { SEOHead } from '@/components/SEOHead';
import { searchArticles } from '@/lib/articles';
import type { ArticleFrontmatter } from '@/lib/articles';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<ArticleFrontmatter[]>([]);

  useEffect(() => {
    if (query) {
      setResults(searchArticles(query));
    } else {
      setResults([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`搜索：${query}`}
        description={`AI制造卓越运营 — 搜索${query}相关的制造业深度文章`}
        url={`/search?q=${query}`}
      />
      {/* Search header */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-5 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">搜索结果</h1>
            <p className="text-sm text-gray-500">
              「<span className="font-medium text-gray-700">{query}</span>」的搜索结果，共{' '}
              <span className="font-semibold text-blue-600">{results.length}</span> 条
            </p>
          </div>
          {/* Search icon */}
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 ml-4">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-100 p-12 text-center shadow-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-800 font-medium text-base mb-1">{query ? '未找到相关内容' : '请输入关键词搜索'}</p>
          <p className="text-sm text-gray-400 mb-4">
            {query ? '试试其他关键词或减少搜索条件' : '在上方输入框中输入要查找的内容'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
