import React from 'react';
import { getAllArticles } from '@/lib/markdown';
import CategoryPage from '@/components/CategoryPage';

export default function TipsTricksPage() {
  const allArticles = getAllArticles();
  const tipsTricks = allArticles.filter(article => article.category === 'tips-tricks');

  return (
    <CategoryPage 
      articles={tipsTricks}
      category="tips-tricks"
      title="Tips & Tricks"
      description="Quick tips, cheats, shortcuts, and tricks to enhance your gaming experience."
    />
  );
}