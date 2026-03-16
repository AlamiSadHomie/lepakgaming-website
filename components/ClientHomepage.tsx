"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Home,
  FileText,
  Book,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Article } from "@/lib/types";

interface ClientHomepageProps {
  articles: Article[];
}

export default function ClientHomepage({ articles }: ClientHomepageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const categories = [
    { id: "all", name: "All", icon: Home, href: "/" },
    { id: "reviews", name: "Reviews", icon: FileText, href: "/reviews" },
    { id: "news", name: "News", icon: FileText, href: "/news" },
    { id: "guides", name: "Guides", icon: Book, href: "/guides" },
    { id: "tips-tricks", name: "Tips & Tricks", icon: HelpCircle, href: "/tips-tricks" },
  ];

  const activeCategory = useMemo(() => {
    if (!pathname || pathname === "/") return "all";
    const match = categories.find(
      (cat) => cat.id !== "all" && pathname.startsWith(`/${cat.id}`)
    );
    return match?.id ?? "all";
  }, [pathname]);

  const featuredArticles = articles.slice(0, 5);
  const filteredArticles = articles;

  const renderRating = (rating?: number) => {
    const safe = Math.max(0, Math.min(5, Number(rating ?? 0)));
    return (
      <span className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Gamepad2
            key={idx}
            size={14}
            className={idx < safe ? "text-purple-400" : "text-gray-600"}
            strokeWidth={idx < safe ? 2.4 : 1.6}
          />
        ))}
      </span>
    );
  };

  const getBadgeColor = (type: string) =>
    type === "original" ? "bg-purple-600" : "bg-blue-600";

  const getBadgeText = (article: Article) => {
    if (article.type === "original") {
      return "ORIGINAL";
    }
    const source = article.source ? article.source.toUpperCase() : "SOURCE";
    return `FROM ${source}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Lepak Gaming logo"
                width={46}
                height={46}
                className="h-[46px] w-[46px] rounded-md object-contain"
                priority
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lepak Gaming
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  aria-label={cat.id === "all" ? "Home" : cat.name}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat.id === "all" ? <Home size={18} aria-hidden /> : cat.name}
                  {cat.id === "all" && <span className="sr-only">Home</span>}
                </Link>
              ))}
            </nav>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-700 transition">
                <Search size={20} />
              </button>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={cat.id === "all" ? "Home" : cat.name}
                  className={`w-full block px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat.id === "all" ? <Home size={18} aria-hidden /> : cat.name}
                  {cat.id === "all" && <span className="sr-only">Home</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Carousel */}
        {activeCategory === "all" && featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Featured</h2>
            <div className="relative group">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  type: "progressbar",
                }}
                navigation={{
                  prevEl: ".featured-prev",
                  nextEl: ".featured-next",
                }}
                loop
                className="rounded-xl overflow-hidden"
              >
                {featuredArticles.map((article) => (
                  <SwiperSlide key={article.slug}>
                    <Link href={`/${article.category}/${article.slug}`}>
                      <div className="relative group cursor-pointer">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <span
                            className={`inline-block px-3 py-1 ${getBadgeColor(article.type)} rounded-full text-xs font-semibold mb-3`}
                          >
                            {getBadgeText(article)}
                          </span>
                          <h3 className="text-4xl font-bold mb-3">{article.title}</h3>
                          <p className="text-gray-300 text-lg mb-4">{article.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-400">
                            <span>{article.author}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {new Date(article.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{article.platform}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom sleek nav buttons */}
              <button
                className="featured-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
              <button
                className="featured-next absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            {activeCategory === "all"
              ? "Latest Articles"
              : categories.find((c) => c.id === activeCategory)?.name}
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-xl">No articles yet in this category.</p>
              <p className="mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
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
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>
                          <span className="font-medium">{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          {article.category === "reviews" && (
                            <span className="ml-2 inline-flex items-center gap-2">
                              <span className="text-gray-600">•</span>
                              {renderRating(article.rating)}
                            </span>
                          )}
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
        </div>
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
