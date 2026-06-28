import type { ArticleFrontmatter } from '@/lib/articles';

interface ArticleCardProps {
  article: ArticleFrontmatter;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const dateStr = new Date(article.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get first tag as category display
  const primaryTag = article.tags[0] || '文章';
  const remainingTags = article.tags.slice(1);

  return (
    <a
      href={`/article/${article.slug}`}
      className="block no-underline group card-hover"
    >
      <article className="bg-white rounded-lg border border-gray-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-card-hover">
        {/* Meta info row - like 墨滴 style */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
          {/* Author */}
          <span className="font-medium text-gray-500">Sam叶</span>
          <span className="text-gray-300">·</span>
          {/* Reading time */}
          <span>{article.readingTime}分钟前</span>
          {primaryTag && (
            <>
              <span className="text-gray-300">·</span>
              <span className="tag-pill px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">
                {primaryTag}
              </span>
            </>
          )}
        </div>

        {/* Title - larger and bold like reference */}
        <h2
          className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-snug"
          style={{ lineHeight: '1.5' }}
        >
          {article.title}
        </h2>

        {/* Summary / excerpt */}
        {article.summary && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.summary}
          </p>
        )}

        {/* Bottom stats row with icons - 墨滴 style */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
          {/* Views icon */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>0</span>
          </div>

          {/* Likes icon */}
          <div className="flex items-center gap-1 text-xs text-gray-400 group/like cursor-pointer">
            <svg className="w-3.5 h-3.5 group-hover/like:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>点赞</span>
          </div>

          {/* Comments icon */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>评论</span>
          </div>

          {/* Date on the right */}
          <time dateTime={article.date} className="ml-auto text-xs text-gray-400">
            {dateStr}
          </time>
        </div>

        {/* Additional tags if more than one */}
        {remainingTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {remainingTags.map(tag => (
              <span
                key={tag}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </a>
  );
}
