import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Monitor, ExternalLink } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import SiteHeader from "@/components/SiteHeader";
import BackToTop from '@/components/BackToTop';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  const news = articles.filter((article) => article.category === "news");
  return news.map((article) => ({ slug: article.slug }));
}

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug("news", slug);

  if (!article) {
    notFound();
  }

  const getBadgeColor = (type: string) => (type === "original" ? "bg-purple-600" : "bg-blue-600");
  const getBadgeText = (article: any) => (article.type === "original" ? "ORIGINAL NEWS" : `FROM ${article.source?.toUpperCase()}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SiteHeader activeCategory="news" />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "News", href: "/news" },
            { label: article.title },
          ]}
        />

        <div className="mb-6">
          <span className={`inline-block px-4 py-2 ${getBadgeColor(article.type)} rounded-full text-sm font-semibold`}>
            {getBadgeText(article)}
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

        <div className="flex flex-wrap gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor size={18} />
            <span>{article.platform}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱</span>
              <span className="text-purple-400 font-medium">{article.readingTime} min read</span>
            </div>
          )}
        </div>

        <div className="mb-8 rounded-xl overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-96 object-cover" />
        </div>

        <div
          className="
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6
            [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:mb-6 [&_ul]:text-gray-300
            [&_ol]:list-decimal [&_ol]:ml-8 [&_ol]:mb-6 [&_ol]:text-gray-300
            [&_li]:mb-2
            [&_strong]:text-white [&_strong]:font-semibold
            [&_a]:text-purple-400 [&_a]:no-underline hover:[&_a]:text-purple-300
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.type === "curated" && article.sourceUrl && (
          <div className="mt-12 p-6 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-gray-400 mb-4">This article was curated from {article.source}. Read the original article for the complete story.</p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Read Full Article on {article.source}
              <ExternalLink size={18} />
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-700">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </article>

      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2026 Lepak Gaming. Buat apa tu? Main game je.</p>
            <p className="mt-2">Reviews • News • Guides • Tips & Tricks</p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
