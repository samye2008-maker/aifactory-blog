import { useState } from 'react';

interface WeChatQrModalProps {
  open: boolean;
  onClose: () => void;
}

export function WeChatQrModal({ open, onClose }: WeChatQrModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="关闭"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 pt-8 pb-6 text-center">
          <div className="w-14 h-14 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526z"/>
            </svg>
          </div>
          <h3 className="text-white font-bold text-lg mb-1">关注「与卓越运营同行」</h3>
          <p className="text-blue-100 text-sm">每周分享 AI + 制造业实战内容</p>
        </div>

        {/* QR Code area */}
        <div className="px-5 py-6">
          <div className="bg-gray-50 rounded-lg p-4 inline-block mx-auto block w-fit">
            <img
              src="/images/wechat-qrcode.jpg"
              alt="与卓越运营同行 微信公众号二维码"
              className="w-52 h-52 rounded-md shadow-sm"
            />
          </div>

          {/* Scan instructions */}
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <span>打开微信，扫描上方二维码</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <span>点击「关注」即可接收每周更新</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>或搜索公众号名称：<strong className="text-gray-800">与卓越运营同行</strong></span>
            </div>
          </div>

          {/* Direct link for mobile */}
          <a
            href="https://weixin.sogou.com/weixin?type=2&query=与卓越运营同行"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors no-underline shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.356-2.373l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l-1.757-1.757" />
            </svg>
            手机用户：直接跳转查看文章 →
          </a>
        </div>
      </div>
    </div>
  );
}

/* Hook for managing the modal state */
export function useWechatQrModal() {
  const [qrOpen, setQrOpen] = useState(false);
  return {
    qrOpen,
    openQr: () => setQrOpen(true),
    closeQr: () => setQrOpen(false),
    QrModal: () => <WeChatQrModal open={qrOpen} onClose={() => setQrOpen(false)} />,
  };
}
