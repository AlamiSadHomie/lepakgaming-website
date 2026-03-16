import React from 'react';
import { getAllArticles } from '@/lib/markdown';
import CategoryPage from '@/components/CategoryPage';

export default function ReviewsPage() {
  const allArticles = getAllArticles();
  const reviews = allArticles.filter(article => article.category === 'reviews');

  return (
    <CategoryPage 
      articles={reviews}
      category="reviews"
      title="Reviews"
      description="In-depth game reviews covering gameplay, graphics, story, and overall experience."
    />
  );
}