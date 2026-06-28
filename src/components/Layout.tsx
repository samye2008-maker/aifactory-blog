import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWechatQrModal } from './WeChatQrModal';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openQr, QrModal } = useWechatQrModal();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/tags', label: '标签' },
    { to: '/about', label: '关于' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f8fa' }}>
      {/* Header - 墨滴风格 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">AI</span>
            </div>
            <a href="/" className="text-lg font-bold text-gray-800 no-underline hover:text-blue-600 transition-colors">
              AI制造卓越运营
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.to}
                href={link.to}
                className={`px-4 py-2 text-sm font-medium no-underline rounded-md transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA Button - 关注公众号 */}
            <button
              onClick={openQr}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-md hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526zm-2.79 3.453c.525 0 .951.433.951.966a.96.96 0 01-.951.965.96.96 0 01-.951-.965c0-.533.426-.966.951-.966zm5.58 0c.525 0 .951.433.951.966a.96.96 0 01-.951.965.96.96 0 01-.951-.965c0-.533.426-.966.951-.966z"/>
              </svg>
              关注公众号
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.to}
                href={link.to}
                className={`block px-3 py-2 text-sm rounded-md no-underline transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <span className="font-bold text-gray-800">AI制造卓越运营</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                让 AI 扎根车间，让精益拥抱智能<br />
                制造业 AI 转型的实用指南
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">快速导航</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-500 hover:text-blue-600 no-underline transition-colors">首页</a></li>
                <li><a href="/tags" className="text-gray-500 hover:text-blue-600 no-underline transition-colors">标签归档</a></li>
                <li><a href="/about" className="text-gray-500 hover:text-blue-600 no-underline transition-colors">关于博主</a></li>
              </ul>
            </div>

            {/* Contact / WeChat */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">联系方式</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526zm-2.79 3.453c.525 0 .951.433.951.966a.96.96 0 01-.951.965.96.96 0 01-.951-.965c0-.533.426-.966.951-.966zm5.58 0c.525 0 .951.433.951.966a.96.96 0 01-.951.965.96.96 0 01-.951-.965c0-.533.426-.966.951-.966z"/></svg>
                  微信公众号「与卓越运营同行」
                </li>
                <li className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  samye2008@163.com
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} AI制造卓越运营 · All Rights Reserved
          </div>
        </div>
      </footer>

      {/* WeChat QR Code Modal */}
      <QrModal />
    </div>
  );
}
