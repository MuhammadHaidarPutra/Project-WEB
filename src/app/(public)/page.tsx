import { prisma } from '@/lib/prisma';
import { Hero } from '@/components/public/Hero';
import { StatsSection } from '@/components/public/StatsSection';
import { AboutPreview } from '@/components/public/AboutPreview';
import { ServicesSection } from '@/components/public/ServicesSection';
import { CostEstimator } from '@/components/public/CostEstimator';
import { PortfolioSection } from '@/components/public/PortfolioSection';
import { ProcessSection } from '@/components/public/ProcessSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { BlogSection } from '@/components/public/BlogSection';
import { CTASection } from '@/components/public/CTASection';

export const revalidate = 60; // ISR revalidate every 60s

export default async function HomePage() {
  const [services, projects, posts] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      include: { images: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: true,
        author: { select: { name: true, email: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
  ]);

  return (
    <>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesSection services={services} />

      {/* Interactive Estimator Section */}
      <section className="py-20 bg-slate-100 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostEstimator />
        </div>
      </section>

      <PortfolioSection projects={projects} />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection posts={posts} />
      <CTASection />
    </>
  );
}
