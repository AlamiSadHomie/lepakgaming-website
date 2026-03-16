"use client";

import React from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { ExternalLink, ChevronRight } from "lucide-react";
import SiteHeader, { CategoryId } from "./SiteHeader";

interface CategoryPageProps {
  articles: Article[];
  category: CategoryId;
  title: string;
  description: string;
}

export default function CategoryPage({ articles, category, title, description }: CategoryPageProps) {
  const getBadgeColor = (type: string) => (type === "original" ? "bg-purple-600" : "bg-blue-600");

  const getBadgeText = (article: Article) => {
    if (article.type === "original") return "ORIGINAL";
    const source = article.source ? article.source.toUpperCase() : "SOURCE";
    return `FROM ${source}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SiteHeader activeCategory={category} />

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
            {articles.length} {articles.length === 1 ? "article" : "articles"}
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
                        <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </div>
                      {article.type === "curated" ? (
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
            <p>� 2026 Lepak Gaming. Buat apa tu? Main game.</p>
            <p className="mt-2">Reviews � News � Guides � Tips & Tricks</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
