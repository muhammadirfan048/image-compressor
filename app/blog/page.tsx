import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Blog - Image Compression & Optimization Tips | Image Compressor',
  description:
    'Expert guides on image compression, format conversion, and optimization techniques. Learn how to compress JPG, PNG, WebP, AVIF images for faster websites and better SEO.',
  keywords: 'image compression blog, image optimization guide, WebP vs AVIF, image converter, image compression tutorial, SEO image optimization, bulk image processing',
  openGraph: {
    title: 'Image Optimization Blog - Expert Tips & Guides',
    description: 'Learn about image compression, format conversion, and optimization techniques for faster websites.',
    type: 'website',
    url: 'https://picsreduce.com/blog',
    siteName: 'PicsReduce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Optimization Blog - Expert Tips & Guides',
    description: 'Learn about image compression, format conversion, and optimization techniques for faster websites.',
    creator: '@picsreduce',
  },
  alternates: {
    canonical: 'https://picsreduce.com/blog',
  },
}

interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Image Compression: The Complete Guide',
    description:
      'Learn about lossless vs lossy compression and why you should compress your images for better website performance. Discover the benefits of image optimization for faster loading times, improved SEO rankings, and enhanced user experience.',
    category: 'Compression',
    slug: 'image-compression-guide',
  },
  {
    id: '2',
    title: ' WebP vs AVIF: The Foreseeable Advancement of Web Images',
    description:
      'Compare these next-generation image formats and discover which one offers the best compression and quality for your website. Understand browser support, compression ratios, and implementation strategies for modern web development.',
    category: 'Formats',
    slug: 'webp-vs-avif-comparison',
  },
  {
    id: '3',
    title: 'Image Optimization for SEO: A Thorough Overview',
    description:
      "Improve your website's search engine ranking with proven image optimization techniques that boost performance and visibility. Learn about Core Web Vitals, alt text best practices, and technical SEO strategies.",
    category: 'SEO',
    slug: 'seo-image-optimization',
  },
  {
    id: '4',
    title: 'Bulk Image Processing: Save Time and Boost Productivity',
    description:
      'Learn how to efficiently process multiple images at once for websites, social media, and professional projects. Discover best practices for batch processing and maintaining consistent quality across large image sets.',
    category: 'Productivity',
    slug: 'bulk-image-processing',
  },
  {
    id: '5',
    title: 'Mobile Image Optimization: Key Consideration for Modern Websites',
    description:
      'Discover why mobile-first image optimization is crucial and learn techniques to deliver fast-loading images on any device. Understand responsive images, compression strategies, and mobile performance optimization.',

    category: 'Mobile',
    slug: 'mobile-image-optimization',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" role="main">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-16 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text pb-4 text-4xl font-bold leading-tight text-transparent md:text-5xl pt-[50px]">
              Image Compression & Optimization Blog
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Expert tips and guides on image compression, format conversion, and optimization
              techniques for faster websites and better SEO performance.
            </p>
          </header>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg"
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full border-0">
                    <div className="p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <Badge className="border-none bg-blue-100 text-blue-600 hover:bg-blue-200">
                          {post.category}
                        </Badge>
                      </div>

                      <h2 className="mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-400 md:text-3xl">
                        {post.title}
                      </h2>

                      <p className="mb-6 text-lg leading-relaxed text-gray-600">{post.description}</p>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-semibold text-blue-600 transition-all hover:text-blue-800 group-hover:gap-2"
                      >
                        Read Article
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-6 py-3 text-base font-medium text-blue-800">
              More articles coming soon!
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
