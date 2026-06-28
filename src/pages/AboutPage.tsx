import { SEOHead } from '@/components/SEOHead';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="关于博主"
        description="Sam叶 — 制造业卓越运营实践者，连接精益管理思想与 AI 技术落地"
        keywords={['制造业', 'AI转型', '精益管理', '卓越运营', '个人介绍']}
        url="/about"
      />
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">关于博主</h1>
            <p className="text-sm text-gray-400 mt-0.5">让 AI 扎根车间，让精益拥抱智能</p>
          </div>
        </div>
      </div>

      {/* Main content area - white cards */}
      <div className="space-y-5">
        {/* About Me Card */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
            关于博主
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              你好！我是 <strong className="text-gray-800">Sam叶</strong>，一名深耕制造业 20 余年的运营管理实践者。
              从一线工艺工程师起步，逐步成长为外企中国区精益负责人、民营头部企业多基地运营管理者，
              亲历了风电叶片、复合材料、建材等多个行业的精益转型与工厂建设。
            </p>
            <p>
              曾在行业外企巨头担任中国区精益负责人，负责精益六西格玛体系建设，
              3 年间将改善团队从 3 人发展到 12 人，为中国区输送多位生产经理；
              随后在另一家外企担任精益项目经理，主导供应商生产线导入和绩效优化。
            </p>
            <p>
              最近 6 年，在民营行业头部企业以精益专家身份兼任生产运营、设备管理、招聘团队等多个负责人角色，
              从 0 到 1 建立了公司第一家叶片工厂，6 个月内组建超 250 人的高绩效制造团队，
              带领团队创造行业最快新工厂爬坡记录，一年内将生产力提升至行业领先水平。
            </p>
            <p className="text-blue-700 bg-blue-50 rounded-md px-4 py-3 italic border-l-2 border-blue-300">
              我相信，AI 不是制造业的锦上添花，而是实现卓越运营的关键引擎；<br />
              而精益管理的深厚功底，正是让 AI 真正落地生根的土壤。
            </p>
          </div>
        </section>

        {/* Core Highlights */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
            核心亮点
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: '🏭', title: '从 0 到 1 建厂实战', desc: '主导公司第一家叶片工厂建设，行业最快爬坡' },
              { icon: '🔧', title: '精益六西格玛体系', desc: '外企中国区精益负责人，团队 3→12 人' },
              { icon: '⚡', title: '多角色跨界管理', desc: '兼任生产/质量/设备/招聘多个负责人' },
              { icon: '🎓', title: '跨学科教育背景', desc: '工业工程硕士 + 双 MBA' },
              { icon: '🏆', title: '六西格玛黑带认证', desc: '中质协注册黑带，多个改善项目经验' },
              { icon: '✍️', title: '持续知识输出', desc: '公众号「与卓越运营同行」深度分享' },
            ].map(item => (
              <div key={item.title} className="group bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="text-lg mb-1.5">{item.icon}</div>
                <p className="font-medium text-gray-800 text-sm mb-0.5">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content Positioning */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            内容定位
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            <strong className="text-gray-800">"制造业 AI 转型的第一内容阵地"</strong> — 连接精益管理思想与 AI 技术落地
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '🎯 实用性', desc: '解决具体痛点' },
              { label: '🔬 专业性', desc: 'IE+AI+管理融合' },
              { label: '📡 前沿性', desc: '追踪学术前沿' },
              { label: '📚 系统性', desc: '完整知识体系' },
            ].map(item => (
              <div key={item.label} className="text-center p-3 bg-blue-50/60 rounded-lg">
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seven Pillars */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
            七大内容支柱
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 pr-4 font-semibold text-gray-700 w-[180px]">支柱</th>
                  <th className="text-left py-2.5 font-semibold text-gray-700">覆盖范围</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ['精益管理基石', 'VSM、5S、Kaizen 的 AI 增强版，浪费识别与消除'],
                  ['AI 在管理系统中的应用', 'MES+AI、ERP+AI、WMS+AI、QMS+AI、低代码+AI'],
                  ['AI Native 转型路径', '智能化演进路线、AI Native 架构、数据基座'],
                  ['卓越运营框架', 'TOC、Six Sigma+AI、OEE 提升、TPM 智能化'],
                  ['流程管理与IT化', '流程挖掘、BPMS 选型、RPA+AI'],
                  ['前沿周报（固定栏目）', '顶会论文速递、行业动态、工具更新'],
                  ['专业书籍推荐（固定栏目）', '经典重读、新书速评、阅读指南'],
                ].map(([pillar, scope], idx) => (
                  <tr key={pillar} className={`border-b border-gray-50 ${idx % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                    <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">{pillar}</td>
                    <td className="py-2.5">{scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Target Audience */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
            目标受众
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { role: '决策层 — 工厂总经理 / 运营总监', pain: '如何用量化结果说服老板投资 AI', pref: '案例研究、ROI 分析' },
              { role: '执行层 — 精益经理 / IE 工程师 / IT 负责人', pain: '如何落地、选什么工具、怎么推', pref: '实操指南、工具测评' },
              { role: '学术 / 研究层 — 研究员 / 咨询顾问', pain: '跟踪前沿、建立方法论', pref: '文献综述、趋势报告' },
              { role: '生态层 — AI 解决方案商 / 系统集成商', pain: '理解客户需求、找到切入点', pref: '行业洞察、需求分析' },
            ].map(item => (
              <div key={item.role} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="font-medium text-gray-800 text-sm mb-1">{item.role}</p>
                <p className="text-xs text-gray-500"><span className="text-red-500">痛点：</span>{item.pain}</p>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-blue-500">偏好：</span>{item.pref}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WeChat & Contact - combined card with gradient */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 sm:p-8 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          <div className="relative">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.97 3.258c-2.031 0-3.878.769-5.167 1.986-1.165 1.1-1.888 2.563-1.888 4.174 0 .422.053.835.148 1.235.36 1.487 1.34 2.742 2.683 3.571a.59.59 0 01.237.63l-.273 1.074a.626.626 0 00-.033.194c0 .118.096.214.216.a.326.326 0 00.153-.04l1.328-.81a.87.87 0 01.498-.134c.21 0 .42.027.628.078.777.186 1.61.288 2.473.288 4.057 0 7.348-2.477 7.348-5.53 0-3.053-3.291-5.526-7.348-5.526z"/>
              </svg>
              关注微信公众号
            </h2>
            <p className="text-blue-100 text-sm mb-4 max-w-md">
              深度长文与前沿周报首发于微信公众号「<strong>与卓越运营同行</strong>」，欢迎关注获取最新更新
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <p className="text-blue-200 text-xs mb-0.5">邮箱</p>
                <a href="mailto:samye2008@163.com" className="text-white hover:text-blue-200 no-underline font-medium">
                  samye2008@163.com
                </a>
              </div>
              <div>
                <p className="text-blue-200 text-xs mb-0.5">公众号</p>
                <p className="font-medium">与卓越运营同行</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs mb-0.5">LinkedIn</p>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 no-underline font-medium">
                  Sam Ye
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About this blog */}
        <section className="bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-card">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-gray-400 rounded-full"></span>
            关于本博客
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            本博客使用 React + TypeScript + Tailwind CSS 构建，支持完整的 Markdown 渲染、
            代码高亮、数学公式、标签分类、全文搜索等功能。
            所有文章以 Markdown 文件形式维护，方便版本管理和持续更新。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Markdown', 'KaTeX'].map(tech => (
              <span key={tech} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
