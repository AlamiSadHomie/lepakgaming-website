'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ExternalLink, ChevronRight, Home, Search, Menu, X } from 'lucide-react';

interface CategoryPageProps {
  articles: Article[];
  category: string;
  title: string;
  description: string;
}

export default function CategoryPage({ articles, category, title, description }: CategoryPageProps) {
  const categories = [
    { id: 'home', name: 'Home', href: '/', icon: Home },
    { id: 'reviews', name: 'Reviews', href: '/reviews' },
    { id: 'news', name: 'News', href: '/news' },
    { id: 'guides', name: 'Guides', href: '/guides' },
    { id: 'tips-tricks', name: 'Tips & Tricks', href: '/tips-tricks' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getBadgeColor = (type: string) => (type === 'original' ? 'bg-purple-600' : 'bg-blue-600');

  const getBadgeText = (article: Article) => {
    if (article.type === 'original') return 'ORIGINAL';
    const source = article.source ? article.source.toUpperCase() : 'SOURCE';
    return `FROM ${source}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Lepak Gaming logo"
                width={46}
                height={46}
                className="h-[46px] w-[46px] rounded-md object-contain"
                priority
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lepak Gaming
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                    cat.id === category
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {cat.icon && <cat.icon size={16} aria-hidden />}
                  {!cat.icon && cat.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-700 transition text-gray-200" aria-label="Search">
                <Search size={20} />
              </button>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition text-gray-200"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                    cat.id === category
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.icon && <cat.icon size={16} aria-hidden />}
                  {!cat.icon && cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <ChevronRight size={16} className="text-gray-600" />
          <span className="text-gray-300 font-medium">{title}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-400">{description}</p>
          <div className="mt-4 text-sm text-gray-500">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-4">No articles yet in this category.</p>
            <Link
              href="/"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <article
                key={article.slug}
                className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <Link href={`/${article.category}/${article.slug}`}>
                  <div className="relative cursor-pointer">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 ${getBadgeColor(article.type)} rounded-full text-xs font-semibold flex items-center gap-1`}
                    >
                      {getBadgeText(article)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-purple-400 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div>
                        <span className="font-medium">{article.author}</span>
                        <span className="mx-2">|</span>
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {article.type === 'curated' ? (
                        <ExternalLink size={16} className="text-blue-500" />
                      ) : (
                        <ChevronRight size={16} className="text-purple-500" />
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2026 Lepak Gaming. Buat apa tu? Main game.</p>
            <p className="mt-2">Reviews • News • Guides • Tips & Tricks</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
