import React from 'react';
import { getAllArticles } from '@/lib/markdown';
import CategoryPage from '@/components/CategoryPage';

export default function NewsPage() {
  const allArticles = getAllArticles();
  const news = allArticles.filter(article => article.category === 'news');

  return (
    <CategoryPage 
      articles={news}
      category="news"
      title="News"
      description="Latest gaming news, announcements, and industry updates."
    />
  );
}