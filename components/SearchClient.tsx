"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import type { Article } from "@/lib/types";

interface SearchClientProps {
  articles: Article[];
}

export default function SearchClient({ articles }: SearchClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const filtered = articles.filter((article) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      article.title.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2">Search</h1>
        <p className="text-gray-400 mb-8">Search across all articles, reviews, guides and more.</p>

        {/* Search Input */}
        <div className="relative mb-10">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            autoFocus
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results Count */}
        {query && (
          <p className="text-sm text-gray-400 mb-6">
            {filtered.length === 0
              ? "No results found"
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        )}

        {/* Results */}
        <div className="space-y-4">
          {(query ? filtered : articles).map((article) => (
            <Link
              key={article.slug}
              href={`/${article.category}/${article.slug}`}
              className="flex gap-4 bg-gray-800 rounded-xl p-4 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 transition group"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-700">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    article.type === "original"
                      ? "bg-purple-600/30 text-purple-300"
                      : "bg-blue-600/30 text-blue-300"
                  }`}>
                    {article.type === "original" ? "Original" : "Curated"}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{article.category.replace("-", " & ")}</span>
                </div>
                <h2 className="font-semibold text-white text-sm sm:text-base leading-snug mb-1 line-clamp-2 group-hover:text-purple-300 transition">
                  {article.title}
                </h2>
                <p className="text-xs text-gray-400 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state when no query */}
        {!query && (
          <p className="text-center text-gray-500 mt-12 text-sm">
            Start typing to search through all articles.
          </p>
        )}
      </div>
    </div>
  );
}
