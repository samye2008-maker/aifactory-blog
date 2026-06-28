import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ArticlePage } from '@/pages/ArticlePage';
import { TagPage } from '@/pages/TagPage';
import { AboutPage } from '@/pages/AboutPage';
import { SearchResultsPage } from '@/pages/SearchResultsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/tags" element={<TagPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
