// Type declarations for packages without built-in types

declare module 'gray-matter' {
  export interface GrayMatterFile<T = string> {
    data: Record<string, unknown>;
    content: T;
    excerpt: string;
  }

  const matter: {
    (str: string): GrayMatterFile;
    (str: string, options: { excerpt: boolean }): GrayMatterFile;
  };

  export default matter;
}

declare module 'react-markdown' {
  import type { ComponentType } from 'react';
  interface ReactMarkdownOptions {
    children: string;
    remarkPlugins?: ComponentType[];
    rehypePlugins?: ComponentType[];
  }
  const ReactMarkdown: ComponentType<ReactMarkdownOptions>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const plugin: unknown;
  export default plugin;
}

declare module 'remark-math' {
  const plugin: unknown;
  export default plugin;
}

declare module 'rehype-highlight' {
  const plugin: unknown;
  export default plugin;
}

declare module 'rehype-katex' {
  const plugin: unknown;
  export default plugin;
}

declare module 'rehype-slug' {
  const plugin: unknown;
  export default plugin;
}

declare module 'rehype-autolink-headings' {
  const plugin: (options?: { behavior: string }) => unknown;
  export default plugin;
}

declare module 'rehype-meta' {
  const plugin: (options?: { target?: string; rel?: string[] }) => unknown;
  export default plugin;
}
