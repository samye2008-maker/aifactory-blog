import type { ArticleFrontmatter } from '@/lib/articles';

interface SidebarProps {
  articles?: ArticleFrontmatter[];
  onOpenQr?: () => void;
}

export function Sidebar({ articles, onOpenQr }: SidebarProps) {
  // Get latest 5 articles for "recent" list
  const recentArticles = (articles || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <aside className="space-y-5">
      {/* 公众号推广 Card - 带二维码 */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-card">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-0.5">关注「与卓越运营同行」</h3>
              <p className="text-green-100 text-xs leading-relaxed">每周分享 AI + 制造业实战内容</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          {/* QR Code Image */}
          <div
            onClick={onOpenQr}
            className="cursor-pointer group mx-auto w-fit"
          >
            <div className="bg-gray-50 rounded-lg p-2 group-hover:shadow-md transition-shadow">
              <img
                src="/images/wechat-qrcode.jpg"
                alt="微信扫码关注「与卓越运营同行」公众号"
                className="w-40 h-40 rounded-md"
                loading="lazy"
              />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 group-hover:text-green-600 transition-colors flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              点击放大 / 微信扫一扫
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-3 space-y-2">
            {onOpenQr && (
              <button
                onClick={onOpenQr}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                扫码关注公众号
              </button>
            )}
            <a
              href="https://weixin.sogou.com/weixin?type=2&query=与卓越运营同行"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors no-underline"
            >
              查看更多文章 →
            </a>
          </div>
        </div>
      </div>

      {/* 热门标签 */}
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-card">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          内容分类
        </h3>
        <div className="flex flex-wrap gap-2">
          {['AI转型', '精益管理', 'MES', '流程挖掘', 'Six Sigma', '卓越运营', 'TPM', 'OEE', '智能制造'].map(tag => (
            <a
              key={tag}
              href={`/tags?tag=${encodeURIComponent(tag)}`}
              className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors no-underline tag-pill"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* 最新文章 */}
      {recentArticles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-card">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            最新文章
          </h3>
          <ul className="space-y-0">
            {recentArticles.map((article, idx) => (
              <li key={article.slug}>
                <a
                  href={`/article/${article.slug}`}
                  className="group flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-b-0 no-underline"
                >
                  <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-medium ${
                    idx < 3 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                    {article.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 博客定位介绍 */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-5 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            本站定位
          </h3>
          <p className="text-xs leading-relaxed text-slate-300 mb-3">
            连接<span className="text-blue-400 font-medium">精益管理思想</span>与
            <span className="text-blue-400 font-medium">AI 技术落地</span><br/>
            帮助制造企业实现卓越运营
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['AI+制造', '数据驱动', '持续改善'].map(item => (
              <span key={item} className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
