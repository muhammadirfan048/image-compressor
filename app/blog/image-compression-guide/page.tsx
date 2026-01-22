import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Share2, Bookmark, ThumbsUp, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Image Compression: The Complete Guide 2025 | Image Compressor Blog',
  description:
    'Learn about image compression types, benefits for website speed, SEO improvements, and why you should compress your images. Complete guide to lossless vs lossy compression.',
  keywords:
    'image compression, lossless compression, lossy compression, website speed, SEO optimization, compress images, image optimization guide',
  openGraph: {
    title: 'Image Compression: The Complete Guide',
    description: 'Learn about image compression types, benefits for website speed, and SEO improvements.',
    type: 'article',
    url: 'https://picsreduce.com/blog/image-compression-guide',
    publishedTime: '2024-01-15T00:00:00Z',
    authors: ['picsreduce Team'],
    siteName: 'PicsReduce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Compression: The Complete Guide',
    description: 'Learn about image compression types, benefits for website speed, and SEO improvements.',
    creator: '@picsreduce',
  },
  alternates: {
    canonical: 'https://picsreduce.com/blog/image-compression-guide',
  },
}

export default function ImageCompressionGuide() {
  const articleSchema = generateArticleSchema({
    title: 'Image Compression: The Complete Guide',
    description: 'Learn about image compression types, benefits for website speed, SEO improvements, and why you should compress your images.',
    slug: 'image-compression-guide',
    datePublished: '2024-01-15T00:00:00Z',
    dateModified: '2024-12-01T00:00:00Z',
    keywords: ['image compression', 'lossless compression', 'lossy compression', 'website speed', 'SEO optimization'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Image Compression Guide', url: '/blog/image-compression-guide' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" role="main">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </nav>

            <header>
              <div className="mb-4 flex items-center gap-3">
                <Badge className="border-none bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Compression
                </Badge>
                <time className="flex items-center text-sm text-gray-500" dateTime="2024-01-15">
                  <Clock className="mr-1 h-4 w-4" aria-hidden="true" />5 min read
                </time>
              </div>

              <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
                Image Compression: The Complete Guide
              </h1>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-xl text-gray-700">
                As far as digital files are concerned, compression refers to the process of encoding
                information in such a way that it contains fewer bits than the original file. In
                simpler terms, it refers to changing a large file into a smaller one.
              </p>

              <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
                Types of Image Compression
              </h2>

            <div className="my-8 grid gap-6 md:grid-cols-2">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                <h3 className="mb-3 text-xl font-semibold text-blue-900">Lossless Compression</h3>
                <p className="text-gray-700">
                  Lossless compression is when a compression tool deletes empty, redundant, or
                  duplicate bits of a file. This creates a smaller file that is equal in quality to
                  the original.
                </p>
                <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-gray-600">
                  Perfect for: Professional photography, medical imaging, archival purposes
                </div>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
                <h3 className="mb-3 text-xl font-semibold text-purple-900">Lossy Compression</h3>
                <p className="text-gray-700">
                  Lossy compression is when the compressor deletes excessive or unnecessary bits of
                  a file. This will result in a smaller file, albeit one with lower quality.
                </p>
                <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-gray-600">
                  Perfect for: Web images, social media, email attachments
                </div>
              </Card>
            </div>

            <p className="mb-6 text-gray-700">
              In terms of settings, the extent of compression that can be applied depends on how
              much loss of quality the viewer is willing to accept.
            </p>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              Why Would Anyone Want to Compress Images?
            </h2>

            <p className="mb-6 text-gray-700">
              Depending on the source of an image, the file can be relatively large. A JPG image
              file from a professional DSLR camera, for instance, might be several dozen megabytes.
              Depending on your needs, this could be too large. In situations that require easier
              storage and better uploading speed, compressing this image would be highly useful.
            </p>

            <p className="mb-6 text-gray-700">
              In the same way, photographs may be stored on your phone's memory. These photographs
              may be consuming a large amount of storage space and may be restricting you from
              capturing more images.
            </p>

            <div className="my-12 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Benefits of Image Compression for Websites
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                    <span className="text-xl text-white">⚡</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      Increase the Speed of Your Site
                    </h3>
                    <p className="text-gray-700">
                      Your website is so much slower than it could be - Images make up nearly half
                      of the loading speeds! When they are optimized, a precious few seconds are
                      gained.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                    <span className="text-xl text-white">🔍</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Enhanced SEO</h3>
                    <p className="text-gray-700">
                      Improved loading speeds and overall website efficiency translates to being
                      seen more often on Google, which means more visitors. While the visitors are
                      on your site, you have the opportunity to keep them there.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600">
                    <span className="text-xl text-white">😊</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      Ensures and Improves User Experience
                    </h3>
                    <p className="text-gray-700">
                      Increased engagement and exposure means more followers, and in turn, more
                      revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">Completely Optimizable</h2>

            <div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                'Business Analytics Tools',
                'Google Optimization Tools',
                'Super Sales Optimization',
                'Top Selling Optimization Tools',
              ].map((tool, index) => (
                <div key={index} className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="font-medium text-gray-800">{tool}</p>
                </div>
              ))}
            </div>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
