"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, FileText, Book, HelpCircle, Search, Menu, X } from "lucide-react";

export type CategoryId = "all" | "reviews" | "news" | "guides" | "tips-tricks";

interface SiteHeaderProps {
  activeCategory?: CategoryId;
}

const categories: { id: CategoryId; name: string; href: string; icon?: typeof Home }[] = [
  { id: "all", name: "Home", href: "/", icon: Home },
  { id: "reviews", name: "Reviews", href: "/reviews", icon: FileText },
  { id: "news", name: "News", href: "/news", icon: FileText },
  { id: "guides", name: "Guides", href: "/guides", icon: Book },
  { id: "tips-tricks", name: "Tips & Tricks", href: "/tips-tricks", icon: HelpCircle },
];

export default function SiteHeader({ activeCategory }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentCategory = useMemo(() => {
    if (activeCategory) return activeCategory;
    if (!pathname || pathname === "/") return "all";
    const match = categories.find(
      (cat) => cat.id !== "all" && pathname.startsWith(`/${cat.id}`)
    );
    return match?.id ?? "all";
  }, [activeCategory, pathname]);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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

          <nav className="hidden md:flex space-x-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                aria-label={cat.id === "all" ? "Home" : cat.name}
                className={`px-3 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
                  currentCategory === cat.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.id === "all" ? <Home size={18} aria-hidden /> : cat.name}
                {cat.id === "all" && <span className="sr-only">Home</span>}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-700 transition" aria-label="Search">
              <Search size={20} />
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
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
                onClick={() => setIsMenuOpen(false)}
                aria-label={cat.id === "all" ? "Home" : cat.name}
                className={`w-full block px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                  currentCategory === cat.id
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
  );
}
