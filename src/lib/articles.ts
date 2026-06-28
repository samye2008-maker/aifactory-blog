export interface ArticleFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  slug: string;
  description?: string;
  keywords?: string[];
  readingTime: number;
  wechatUrl?: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

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

    // Handle array-like values: ["tag1", "tag2"]
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value) as unknown as string;
      } catch {
        // ignore
      }
    }

    data[key] = value;
  }

  return { data, content };
}

const articleModules = import.meta.glob('/content/articles/*.md', {
  eager: true,
  query: '?raw',
});

export function getArticleList(): ArticleFrontmatter[] {
  const articles: ArticleFrontmatter[] = [];

  for (const [filePath, mod] of Object.entries(articleModules)) {
    const raw = (mod as { default: string }).default;
    const { data, content } = parseFrontmatter(raw);

    const slug = filePath
      .replace('/content/articles/', '')
      .replace(/\.md$/, '');

    articles.push({
      title: (data.title as string) || slug,
      date: (data.date as string) || '2024-01-01',
      summary: (data.summary as string) || '',
      tags: (data.tags as string[]) || [],
      cover: (data.cover as string) || undefined,
      slug,
      description: (data.description as string) || (data.summary as string) || '',
      keywords: (data.keywords as string[]) || (data.tags as string[]) || [],
      readingTime: calculateReadingTime(content),
      wechatUrl: (data.wechatUrl as string) || undefined,
    });
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = `/content/articles/${slug}.md`;
  const mod = articleModules[filePath] as { default: string } | undefined;
  if (!mod) return null;

  const raw = mod.default;
  const { data, content } = parseFrontmatter(raw);

  return {
    title: (data.title as string) || slug,
    date: (data.date as string) || '2024-01-01',
    summary: (data.summary as string) || '',
    tags: (data.tags as string[]) || [],
    cover: (data.cover as string) || undefined,
    slug,
    description: (data.description as string) || (data.summary as string) || '',
    keywords: (data.keywords as string[]) || (data.tags as string[]) || [],
    content,
    readingTime: calculateReadingTime(content),
    wechatUrl: (data.wechatUrl as string) || undefined,
  };
}

export function getAllTags(): string[] {
  const articles = getArticleList();
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function searchArticles(query: string): ArticleFrontmatter[] {
  const all = getArticleList();
  const lower = query.toLowerCase();
  return all.filter(a =>
    a.title.toLowerCase().includes(lower) ||
    a.summary.toLowerCase().includes(lower) ||
    a.tags.some(t => t.toLowerCase().includes(lower))
  );
}
