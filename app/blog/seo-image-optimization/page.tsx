import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Share2, Bookmark, ThumbsUp, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Image Optimization for SEO: A Thorough Overview | picsreduce Blog',
  description:
    'Learn how to optimize images for better SEO rankings. Discover Core Web Vitals, alt text best practices, and technical optimization strategies.',
  keywords:
    'image SEO, Core Web Vitals, alt text, image optimization, search engine optimization, page speed',
}

export default function SEOImageOptimization() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <Badge className="border-none bg-green-100 text-green-800 hover:bg-green-200">
              SEO
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />8 min read
            </div>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text pb-4 text-4xl font-bold leading-tight text-transparent md:text-5xl">
            Image Optimization for SEO: A Thorough Overview
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="mb-8 text-xl text-gray-700">
              Unchecked images can literally frame your website or string it down in search engines.
              However, images can increase click rates per exposure and degree of uncovering for
              each resource link read, thus rank higher after optimization. Search algorithms
              witnessed high demand in focus areas that include account balance type search entry
              along with page ease of use and opening velocity. While the later operates within the
              range of real-time transformation of imagery data, page intelligence translates it
              into identified benefits for SEO maintenance.
            </p>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              The Effect of Core Web Vitals
            </h2>
            <p className="mb-6 text-gray-700">
              Google has defined user experience quite literally as users appetite for motivation,
              patience, eagerness and eye contact. Core Web Vitals assist in monitoring these
              metrics through checking load speed, visual steadiness, interactivity during core
              dependency algorithm executions: running crawlers to fetch information. Thus, also
              ensure that the images on webpages are adequately optimized in order to streamline
              their usability based on relation algorithms.
            </p>

            <div className="my-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-blue-900">LCP</h3>
                <p className="text-sm text-gray-700">
                  Largest Contentful Paint - often an image element
                </p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-green-900">FID</h3>
                <p className="text-sm text-gray-700">
                  First Input Delay - affected by image loading
                </p>
              </div>
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-purple-900">CLS</h3>
                <p className="text-sm text-gray-700">
                  Cumulative Layout Shift - prevent with dimensions
                </p>
              </div>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">SEO Best Practices</h2>

            <div className="space-y-6">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Alt Text Optimization</h3>
                <p className="mb-3 text-gray-700">
                  Write descriptive, keyword-rich alt text that accurately describes the image
                  content. Keep it natural and helpful for screen readers.
                </p>
                <div className="rounded bg-gray-50 p-3 text-sm">
                  <strong>Good:</strong> “Red running shoes on wooden floor with morning sunlight”
                  <br />
                  <strong>Bad:</strong> “image1.jpg” or repetitve keyword stuffing
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">File Naming Technique</h3>
                <p className="mb-3 text-gray-700">
                  Also combine relevant phrases in natural wording together with defignent verbs for
                  titled which serve to set boundaries between objects.
                </p>
                <div className="rounded bg-gray-50 p-3 text-sm">
                  <strong>Good:</strong> “blue-running-shoes-nike-2024”.
                  <br />
                  <strong>Bad:</strong> "IMG_1234.jpg" or "photo.jpg"
                </div>
              </div>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">Technical Aspects</h2>

            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-amber-900">Key Technical Factors:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Image Sitemaps:</strong>Turns each of your files into a depicted
                  application ensuring easy access for their finding.
                </li>
                <li>
                  • <strong>Structured Data:</strong> Reinforces warranties provided by scheme added
                  clips transliterated into labels transform bursts marking snippets to be listed
                  below azul cubes hyperlinks around scroll bars head.
                </li>
                <li>
                  • <strong>Replicative Images:</strong> Really as sub-headed serve specific volumes
                  to various imagery displaying devices.
                </li>
                <li>
                  • <strong>Lazy Loading:</strong> Improve initial page load time.
                </li>
                <li>
                  • <strong>CDN Offshores:</strong> Outer islands fasted launching boxes speed angle
                  from Areas distributed around sphere shaped blot map
                </li>
              </ul>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              Image optimization strategies
            </h2>
            <p className="mb-6 text-gray-700">
              Image optimization strategies begin with the effective use of formats. Consider modern
              alternatives such as WebP and AVIF as they provide better SEO value through swift
              loading times due to their advanced compression techniques.
            </p>

            <div className="my-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">For Photographs</h3>
                <p className="text-sm text-gray-700">
                  Use AVIF → WebP → JPEG with progressive enhancement
                </p>
              </div>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">For Graphics</h3>
                <p className="text-sm text-gray-700">
                  Use SVG for images containing intricate shapes, WebP for sophisticated images.
                </p>
              </div>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              Monitoring and Measurement
            </h2>
            <p className="mb-6 text-gray-700">
              Use PageSpeed Insights, Search Console as well as Core Web Vitals reports to
              comprehensively evaluate image optimization and uncover areas for enhancement.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
