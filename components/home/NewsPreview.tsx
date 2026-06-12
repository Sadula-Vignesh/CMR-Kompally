import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getNewsArticles } from '@/lib/googleSheets';

export default async function NewsPreview() {
  const articles = await getNewsArticles();
  // We only show the first 3 articles for the home page preview
  const previewArticles = articles.slice(0, 3);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            title="Latest News & Events"
            subtitle="Campus Updates"
            align="left"
          />
          <div className="mb-8 md:mb-0">
            <Button href="/news" variant="outline" className="text-sm">
              View All News
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewArticles.map((article, idx) => (
            <Card
              key={article.slug || idx}
              className="flex flex-col justify-between border-t-4 border-brand-orange h-full"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium font-body">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    {article.date}
                  </span>
                  <Badge variant="orange">{article.category}</Badge>
                </div>
                
                <h3 className="font-body font-bold text-lg text-brand-navy leading-snug group-hover:text-brand-orange transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-auto">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors gap-1"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
