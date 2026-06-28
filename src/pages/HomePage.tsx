import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '@/components/ArticleCard';
import { Sidebar } from '@/components/Sidebar';
import { Pagination } from '@/components/Pagination';
import { useWechatQrModal } from '@/components/WeChatQrModal';
import { SEOHead } from '@/components/SEOHead';
import { getArticleList } from '@/lib/articles';

const ARTICLES_PER_PAGE = 8;

// Main content categories for top nav bar
const CATEGORIES = [
  { key: '', label: '最新' },
  { key: 'AI转型', label: 'AI转型' },
  { key: '精益管理', label: '精益管理' },
  { key: 'MES', label: 'MES' },
  { key: '流程挖掘', label: '流程挖掘' },
  { key: 'Six Sigma', label: 'Six Sigma' },
  { key: '卓越运营', label: '卓越运营' },
  { key: '智能制造', label: '智能制造' },
];

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const { openQr, QrModal } = useWechatQrModal();

  const allArticles = getArticleList();

  // Filter by selected tags or active category
  const filteredArticles = (() => {
    if (selectedTags.length > 0) {
      return allArticles.filter(a => selectedTags.some(tag => a.tags.includes(tag)));
    }
    if (activeCategory) {
      return allArticles.filter(a => a.tags.includes(activeCategory));
    }
    return allArticles;
  })();

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, activeCategory]);

  const handleCategoryClick = (catKey: string) => {
    setActiveCategory(catKey);
    setSelectedTags([]);
  };

  return (
    <div>
      <SEOHead
        title="AI制造卓越运营"
        description="制造业 AI 转型的实用指南 — 涵盖精益管理、MES+AI、AI Native转型、卓越运营框架、流程管理等深度内容"
        keywords={['制造业', 'AI转型', '精益管理', '卓越运营', 'MES', '智能制造', '流程挖掘', 'Six Sigma']}
        url="/"
      />
      {/* Category Navigation Bar - 墨滴风格 */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-3 -mb-px">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  (activeCategory === cat.key && selectedTags.length === 0)
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6 lg:gap-8">
          {/* Left Column - Article List */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-5">
              <SearchBarWrapper />
            </div>

            {/* Tag filter pills (shown when using tag filter mode) */}
            {selectedTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-400">筛选：</span>
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
                  >
                    {tag}
                    <button
                      onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                      className="hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => { setSelectedTags([]); setActiveCategory(''); }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline ml-1"
                >
                  清除全部
                </button>
              </div>
            )}

            {/* Article count indicator */}
            <div className="mb-4 text-xs text-gray-400">
              共 <span className="font-medium text-gray-600">{filteredArticles.length}</span> 篇文章
            </div>

            {/* Article list */}
            {paginatedArticles.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-100 p-12 text-center shadow-card">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-base font-medium">暂无文章</p>
                <p className="text-sm text-gray-400 mt-1">试试选择其他分类或标签</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedArticles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Right Column - Sidebar (hidden on mobile) */}
          <div className="hidden lg:block w-[300px] flex-shrink-0">
            <Sidebar articles={allArticles} onOpenQr={openQr} />
          </div>
        </div>
      </div>

      {/* WeChat QR Code Modal */}
      <QrModal />
    </div>
  );
}

function SearchBarWrapper() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
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
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && query.trim()) {
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          placeholder="搜索文章标题、内容或标签..."
          className="w-full pl-10 pr-20 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-gray-800 placeholder-gray-400 transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 h-5 px-1.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200 pointer-events-none">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
