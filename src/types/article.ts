export interface ArticleFrontmatter {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  cover?: string;
  slug: string;
  description?: string;
  keywords?: string[];
  readingTime: number;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: number; // minutes
}

export interface ArticleListItem extends ArticleFrontmatter {
  readingTime: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
