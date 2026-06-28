import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '@/components/ArticleCard';
import { SEOHead } from '@/components/SEOHead';
import { getArticleList, getAllTags } from '@/lib/articles';

export function TagPage() {
  const [searchParams] = useSearchParams();
  const selectedTags = searchParams.getAll('tag');
  const allTags = getAllTags();
  const allArticles = getArticleList();

  const filteredArticles = selectedTags.length === 0
    ? allArticles
    : allArticles.filter(a => selectedTags.some(tag => a.tags.includes(tag)));

  const tagLabel = selectedTags.length > 0 ? selectedTags.join('、') : '全部标签';

  return (
    <>
      <SEOHead
        title={`标签：${tagLabel}`}
        description={`AI制造卓越运营 — 浏览${tagLabel}相关的制造业深度文章`}
        keywords={selectedTags}
        url={`/tags?tag=${selectedTags.join(',')}`}
      />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="bg-white rounded-lg border border-gray-100 p-6 mb-5 shadow-card">
            <h1 className="text-xl font-bold text-gray-800 mb-1">标签分类</h1>
            <p className="text-sm text-gray-500">选择标签筛选文章，支持多标签组合</p>
          </div>

          {/* Tag pills */}
          <div className="mb-5 flex flex-wrap gap-2 items-center">
            {allTags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <a
                  key={tag}
                  href={`/tags?tag=${encodeURIComponent(tag)}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all no-underline tag-pill ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {tag}
                  {isSelected && (
                    <span className="text-xs opacity-70">({allArticles.filter(a => a.tags.includes(tag)).length})</span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Results */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-100 p-12 text-center shadow-card">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7A2 2 0 0113.5 19V7a4 4 0 00-4-4z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">该标签下暂无文章</p>
              <p className="text-sm text-gray-400 mt-1">试试选择其他标签</p>
            </div>
          ) : (
            <>
              <div className="mb-3 text-xs text-gray-400">
                共 <span className="font-medium text-gray-600">{filteredArticles.length}</span> 篇文章
                {selectedTags.length > 0 && (
                  <span className="ml-2">
                    当前筛选：
                    {selectedTags.map(t => (
                      <span key={t} className="ml-1 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
