import { getAllArticles } from "@/lib/markdown";
import SearchClient from "@/components/SearchClient";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Suspense } from "react";

export const metadata = {
  title: "Search | Lepak Gaming",
  description: "Search through all Lepak Gaming articles, reviews, guides and more.",
};

export default function SearchPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SiteHeader />
      <Suspense>
        <SearchClient articles={articles} />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
