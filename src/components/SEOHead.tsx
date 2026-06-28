import { useEffect } from 'react';

const SITE_URL = 'https://aifactory-globe.cn';
const SITE_NAME = 'AI制造卓越运营';
const DEFAULT_DESCRIPTION = '制造业 AI 转型的实用指南 — 连接精益管理思想与 AI 技术落地';
const DEFAULT_KEYWORDS = '制造业,AI转型,精益管理,卓越运营,MES,ERP,WMS,流程挖掘,TPM,OEE,智能制造,工业4.0,Six Sigma';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  tags?: string[];
  image?: string;
}

/**
 * SEOHead component — dynamically updates document head meta tags.
 * Usage: <SEOHead title="..." description="..." />
 */
export function SEOHead({
  title,
  description,
  keywords,
  url,
  type = 'website',
  publishedTime,
  author = 'Sam叶',
  tags,
  image,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — 制造业 AI 转型的实用指南`;
  const desc = description || DEFAULT_DESCRIPTION;
  const kw = keywords || DEFAULT_KEYWORDS.split(',');
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    setMeta('description', desc);

    // Meta keywords
    setMeta('keywords', kw.join(','));

    // Open Graph
    setMetaProperty('og:title', title || SITE_NAME);
    setMetaProperty('og:description', desc);
    setMetaProperty('og:type', type);
    setMetaProperty('og:url', fullUrl);
    setMetaProperty('og:site_name', SITE_NAME);
    if (image) setMetaProperty('og:image', image);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || SITE_NAME);
    setMeta('twitter:description', desc);

    // Article-specific
    if (type === 'article') {
      if (publishedTime) setMetaProperty('article:published_time', publishedTime);
      if (author) setMetaProperty('article:author', author);
      if (tags) {
        // Remove existing article:tag meta tags
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
        for (const tag of tags) {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.setAttribute('content', tag);
          document.head.appendChild(meta);
        }
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // JSON-LD structured data
    updateJsonLd(title, desc, fullUrl, type, publishedTime, author, tags);
  }, [fullTitle, desc, kw, fullUrl, type, publishedTime, author, tags, image]);

  return null; // This component renders nothing visually
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(prop: string, content: string) {
  let el = document.querySelector(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function updateJsonLd(
  title: string | undefined,
  desc: string,
  url: string,
  type: 'website' | 'article',
  publishedTime: string | undefined,
  author: string | undefined,
  tags: string[] | undefined,
) {
  // Remove existing JSON-LD
  const existing = document.getElementById('seo-jsonld');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.id = 'seo-jsonld';

  if (type === 'article' && title) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: desc,
      url,
      datePublished: publishedTime,
      author: {
        '@type': 'Person',
        name: author || 'Sam叶',
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/wechat-qrcode.jpg`,
        },
      },
      keywords: tags?.join(', ') || '',
      inLanguage: 'zh-CN',
    };
    script.textContent = JSON.stringify(jsonLd);
  } else {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: desc,
      url,
      author: {
        '@type': 'Person',
        name: author || 'Sam叶',
      },
      inLanguage: 'zh-CN',
    };
    script.textContent = JSON.stringify(jsonLd);
  }

  document.head.appendChild(script);
}
