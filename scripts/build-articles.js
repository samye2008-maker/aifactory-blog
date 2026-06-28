const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'generated');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function buildArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

  const articles = [];
  const contents = {};

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const slug = data.slug || file.replace(/\.md$/, '');
    const article = {
      title: data.title || slug,
      date: data.date || '2024-01-01',
      summary: data.summary || '',
      tags: data.tags || [],
      cover: data.cover || null,
      slug,
      description: data.description || data.summary || '',
      keywords: data.keywords || data.tags || [],
      readingTime: calculateReadingTime(content),
    };

    articles.push(article);
    contents[slug] = content;
  }

  // Sort by date descending
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write article list (without content)
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'articleList.ts'),
    `export const articleList = ${JSON.stringify(articles, null, 2)};\n`
  );

  // Write contents map
  const contentsEntries = Object.entries(contents)
    .map(([slug, content]) => `  "${slug}": ${JSON.stringify(content)}`)
    .join(',\n');
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'articleContents.ts'),
    `export const articleContents: Record<string, string> = {\n${contentsEntries}\n};\n`
  );

  console.log(`Built ${articles.length} articles`);
}

buildArticles();
