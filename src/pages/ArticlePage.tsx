import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getArticleBySlug, getArticleList } from '@/lib/articles';
import { SEOHead } from '@/components/SEOHead';
import type { Article } from '@/lib/articles';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article: Article | null = slug ? getArticleBySlug(slug) : null;

  const allArticles = getArticleList();
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-lg border border-gray-100 p-12 shadow-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">文章未找到</h1>
          <p className="text-sm text-gray-500 mb-6">该文章不存在或已被删除</p>
          <Link to="/" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors no-underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date(article.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Check if this is a WeChat article (has wechatUrl or wechat link in content)
  const isWechatArticle = article.wechatUrl || article.content.includes('weixin.sogou.com') || article.content.includes('zhuanlan.zhihu.com');
  const wechatLink = article.wechatUrl || `https://weixin.sogou.com/weixin?type=2&query=${encodeURIComponent(article.title)}`;
  const isZhihuLink = wechatLink.includes('zhuanlan.zhihu.com');
  const linkLabel = isZhihuLink ? '阅读原文（知乎）' : '在微信中搜索原文';
  const linkIcon = isZhihuLink ? (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5.729 22.495l1.903-1.114a.864.864 0 01.717-.098c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446C12.135 12.383 14.965 12 17.126 12.383c-0.576-3.583-4.196-6.348-8.596-6.348C3.891 5.991 0 9.476 0 13.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665z"/>
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526z"/>
    </svg>
  );
  const linkColor = isZhihuLink ? 'text-blue-600 hover:text-blue-700' : 'text-green-600 hover:text-green-700';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={article.title}
        description={article.description || article.summary}
        keywords={article.keywords || article.tags}
        url={`/article/${article.slug}`}
        type="article"
        publishedTime={article.date}
        author="Sam叶"
        tags={article.tags}
      />
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 mb-5 no-underline group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        返回文章列表
      </Link>

      <div className="lg:flex lg:gap-8">
        {/* Main Article Content */}
        <div className="flex-1 min-w-0">
          {/* Article Header Card */}
          <header className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 mb-5 shadow-card">
            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/tags?tag=${encodeURIComponent(tag)}`}
                  className="inline-block text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium no-underline hover:bg-blue-100 transition-colors tag-pill"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta info bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">S</span>
                </div>
                <span className="font-medium text-gray-600">Sam叶</span>
              </div>
              <span className="text-gray-300">·</span>
              <time dateTime={article.date}>{dateStr}</time>
              <span className="text-gray-300">·</span>
              <span>{article.readingTime} 分钟阅读</span>

              {/* Article source link */}
              {isWechatArticle && (
                <>
                  <span className="text-gray-300">·</span>
                  <a
                    href={wechatLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 ${linkColor} no-underline font-medium`}
                  >
                    {linkIcon}
                    {linkLabel}
                  </a>
                </>
              )}
            </div>
          </header>

          {/* Article Body - White card */}
          <article className="prose-article bg-white rounded-lg border border-gray-100 p-6 sm:p-8 mb-5 shadow-card min-h-[300px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath] as any}
              rehypePlugins={[
                rehypeHighlight,
                rehypeKatex,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }] as any,
              ] as any}
            >
              {article.content}
            </ReactMarkdown>
          </article>

          {/* Prev / Next Navigation */}
          {(prevArticle || nextArticle) && (
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {prevArticle ? (
                <Link
                  to={`/article/${prevArticle.slug}`}
                  className="group block bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-200 hover:shadow-card-hover transition-all no-underline"
                >
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1 group-hover:text-blue-500 transition-colors">
                    <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    上一篇
                  </div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-2 transition-colors">
                    {prevArticle.title}
                  </div>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  to={`/article/${nextArticle.slug}`}
                  className="group block bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-200 hover:shadow-card-hover transition-all no-underline text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-gray-400 mb-1 group-hover:text-blue-500 transition-colors">
                    下一篇
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-2 transition-colors">
                    {nextArticle.title}
                  </div>
                </Link>
              ) : <div />}
            </nav>
          )}

          {/* Comments placeholder */}
          <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
            <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              评论与反馈
            </h2>
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-3">欢迎在微信公众号「与卓越运营同行」留言讨论</p>
              {isWechatArticle && (
                <a
                  href={wechatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium ${isZhihuLink ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-green-600 bg-green-50 hover:bg-green-100'} rounded-md transition-colors no-underline`}
                >
                  {isZhihuLink ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v7.5A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75v-7.5A2.25 2.25 0 0018.75 6H13.5zm-3-3V3m0 3h.75M12 15v3m0-3h.75m-3.75 0h7.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526z"/>
                    </svg>
                  )}
                  {isZhihuLink ? '前往知乎原文讨论 →' : '前往公众号评论 →'}
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
