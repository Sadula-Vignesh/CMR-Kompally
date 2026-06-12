import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getNewsArticles } from '@/lib/googleSheets';

export const metadata: Metadata = {
  title: 'News & Blog',
  description: 'Read the latest events, sports triumphs, Olympiad results, and academic updates from CMR School Kompally.',
};

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <>
      <InnerHero
        title="News & Blog"
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="py-16 md:py-24 bg-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center">
            <SectionHeading
              title="Latest Campus Highlights"
              subtitle="News & Events"
              align="center"
            />
            <p className="text-gray-500 text-xs italic mt-2">
              * Note: In production, blog content is synced live from the administrative Google Sheets news channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <Card
                key={article.slug || idx}
                className="flex flex-col justify-between border-t-4 border-brand-orange h-full hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      {article.date}
                    </span>
                    <Badge variant="orange">{article.category}</Badge>
                  </div>
                  
                  <h3 className="font-body font-bold text-lg text-brand-navy leading-snug hover:text-brand-orange transition-colors">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-auto border-t border-gray-50 flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <User className="w-3.5 h-3.5 text-brand-navy" />
                    By {article.author}
                  </span>
                  
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center font-bold text-brand-orange hover:text-brand-orange/80 transition-colors gap-0.5"
                  >
                    Read Post
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
