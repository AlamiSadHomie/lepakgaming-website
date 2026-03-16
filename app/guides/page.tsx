import React from 'react';
import { getAllArticles } from '@/lib/markdown';
import CategoryPage from '@/components/CategoryPage';

export default function GuidesPage() {
  const allArticles = getAllArticles();
  const guides = allArticles.filter(article => article.category === 'guides');

  return (
    <CategoryPage 
      articles={guides}
      category="guides"
      title="Guides"
      description="Complete walkthroughs, strategies, and tips to help you master your favorite games."
    />
  );
}