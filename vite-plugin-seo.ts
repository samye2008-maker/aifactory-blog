import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://aifactory-globe.cn'; // Real domain

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatterStr = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatterStr.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value: string = line.slice(idx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value) as unknown as string;
      } catch { /* ignore */ }
    }
    data[key] = value;
  }
  return { data, content };
}

interface ArticleInfo {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

function readArticles(contentDir: string): ArticleInfo[] {
  const articles: ArticleInfo[] = [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');
    articles.push({
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || '2024-01-01',
      summary: (data.summary as string) || '',
      tags: (data.tags as string[]) || [],
    });
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

function generateSitemap(articles: ArticleInfo[]): string {
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/tags', priority: '0.7', changefreq: 'weekly' },
  ];

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const page of staticPages) {
    lines.push(
      `  <url>`,
      `    <loc>${SITE_URL}${page.url}</loc>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      `  </url>`
    );
  }

  for (const article of articles) {
    lines.push(
      `  <url>`,
      `    <loc>${SITE_URL}/article/${article.slug}</loc>`,
      `    <lastmod>${article.date}</lastmod>`,
      `    <changefreq>monthly</changefreq>`,
      `    <priority>0.9</priority>`,
      `  </url>`
    );
  }

  lines.push('</urlset>');
  return lines.join('\n');
}

function generateRSS(articles: ArticleInfo[]): string {
  const recent = articles.slice(0, 20);
  const buildDate = new Date().toISOString();

  const items = recent.map(a => [
    '    <item>',
    `      <title>${escapeXml(a.title)}</title>`,
    `      <link>${SITE_URL}/article/${a.slug}</link>`,
    `      <description>${escapeXml(a.summary)}</description>`,
    `      <pubDate>${new Date(a.date).toISOString()}</pubDate>`,
    `      <guid isPermaLink="true">${SITE_URL}/article/${a.slug}</guid>`,
    ...a.tags.map(t => `      <category>${escapeXml(t)}</category>`),
    '    </item>',
  ].join('\n')).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>AI制造卓越运营</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <description>制造业 AI 转型的实用指南 — 连接精益管理思想与 AI 技术落地</description>`,
    `    <language>zh-CN</language>`,
    `    <lastBuildDate>${buildDate}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    `    <author>Sam叶</author>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');
}

function generateRobots(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join('\n');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function viteSeoPlugin(): Plugin {
  return {
    name: 'vite-plugin-seo',
    apply: 'build',
    closeBundle() {
      const contentDir = path.resolve(__dirname, 'content/articles');
      const outDir = path.resolve(__dirname, 'dist');

      if (!fs.existsSync(contentDir)) {
        console.warn('[seo] content/articles directory not found');
        return;
      }

      const articles = readArticles(contentDir);

      // Generate sitemap.xml
      const sitemap = generateSitemap(articles);
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8');
      console.log(`[seo] Generated sitemap.xml with ${articles.length + 3} URLs`);

      // Generate rss.xml
      const rss = generateRSS(articles);
      fs.writeFileSync(path.join(outDir, 'rss.xml'), rss, 'utf-8');
      console.log(`[seo] Generated rss.xml with ${Math.min(20, articles.length)} articles`);

      // Generate robots.txt
      const robots = generateRobots();
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf-8');
      console.log(`[seo] Generated robots.txt`);
    },
  };
}
