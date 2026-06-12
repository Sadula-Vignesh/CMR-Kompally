import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getNewsArticles } from '@/lib/googleSheets';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getNewsArticles();
  return articles.map(art => ({
    slug: art.slug
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const articles = await getNewsArticles();
  const article = articles.find(a => a.slug === slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticleDetailsPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const articles = await getNewsArticles();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get 2 related articles (excluding the current one)
  const relatedArticles = articles
    .filter(a => a.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <InnerHero
        title={article.title}
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: "Article Details" }
        ]}
      />

      <section className="py-16 md:py-24 bg-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Full Post Content */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline focus:outline-none mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All News
              </Link>

              {/* Metadata strip */}
              <div className="flex flex-wrap items-center gap-4 bg-brand-cream/50 p-4 rounded-xl border border-brand-gold/15">
                <span className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  {article.date}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <User className="w-4 h-4 text-brand-navy" />
                  By {article.author}
                </span>
                <span className="text-gray-300">|</span>
                <Badge variant="orange" className="bg-brand-orange text-white border-none py-1 px-2.5">
                  {article.category}
                </Badge>
              </div>

              {/* Body Content */}
              <div className="text-gray-750 text-sm md:text-base leading-relaxed font-body space-y-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-brand-navy font-body text-base md:text-lg">
                  {article.excerpt}
                </p>
                <p>
                  {article.content}
                </p>
                <p>
                  At CMR School Kompally, events like these represent our core mission to integrate academic curriculum subjects with practical challenges. Activities are continuously updated to align with modern educational trends, preparing our student scholars for 21st-century accomplishments.
                </p>
                <p>
                  We thank our management team, expert educators, and parent community for their constant cooperation, making these milestones possible every year. Stay tuned to our news feed for more highlights from the Kompally campus.
                </p>
              </div>
            </div>

            {/* Right Column: Related Articles Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <h3 className="font-body font-bold text-lg text-brand-navy border-b border-gray-150 pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-orange" />
                Related Articles
              </h3>

              <div className="flex flex-col space-y-6">
                {relatedArticles.map((rel, idx) => (
                  <Card key={idx} className="border border-gray-100 bg-brand-cream/20">
                    <span className="text-[10px] font-semibold text-brand-orange uppercase block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-body font-bold text-sm text-brand-navy hover:text-brand-orange transition-colors">
                      <Link href={`/news/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <span className="text-[10px] text-gray-500 block mt-2">{rel.date}</span>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
