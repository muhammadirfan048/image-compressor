import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Share2, Bookmark, ThumbsUp, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'WebP vs AVIF: The Future of Web Images | Image Compressor Blog',
  description:
    'Compare WebP and AVIF image formats. Learn about compression ratios, browser support, and which format is best for your website.',
  keywords: 'WebP, AVIF, image formats, web images, compression comparison, browser support',
}

export default function WebPvsAVIFComparison() {
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
            <Badge className="border-none bg-purple-100 text-purple-800 hover:bg-purple-200">
              Formats
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />6 min read
            </div>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text pb-4 text-4xl font-bold leading-tight text-transparent md:text-5xl">
            WebP vs AVIF: The Foreseeable Advancement of Web Images
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="mb-8 text-xl text-gray-700">
              Todays web development calls for sophisticated technologies that can maintain an
              optimal balance between quality and size of an image file. WebP and AVIF are the
              latest representatives in image compression technologies and both present different
              benefits for different applications.
            </p>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              WebP: The Choice of Groundwork
            </h2>
            <p className="mb-6 text-gray-700">
              Having being developed by Google, WebP was designed to compress images at least 25-35%
              better than JPEG without lowering the quality too much. This format also supports
              lossless and lossy compression, also supporting transparency and animation.
            </p>

            <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-900">Advantages of WebP:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Bountiful support from browses (more than 95% of browses)</li>
                <li>• Reduction of file sizes compared to JPEG/PNG</li>
                <li>• Support for transparency and animation</li>
                <li>• Long development of tools and frameworks</li>
                <li>• Acceptance from all major platforms</li>
              </ul>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">
              AVIF: A New Overnight Sensation
            </h2>
            <p className="mb-6 text-gray-700">
              Running on the most recent AV1 video codec, AVIF (AV1 Image File Format) promises far
              better compression than it’s earlier counterparts Such as WebP. It can yield up to 50%
              smaller file size while still retaining the same quality. It is the most recent image
              format participant in the competition.
            </p>

            <div className="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-purple-900">Advantages of AVIF:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Best compression features (50% less than JPEG)</li>
                <li>• Better quality at lower bitrates</li>
                <li>• High respect to color gamut</li>
                <li>• Enable HDR imaging high dynamic range images</li>
                <li>• Film grain synthesis for softer, more natural textures.</li>
              </ul>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">Performance Comparison</h2>

            <div className="my-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">File Size Reduction</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>WebP vs JPEG:</span>
                    <span className="font-semibold text-green-600">25-35% smaller</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AVIF vs JPEG:</span>
                    <span className="font-semibold text-purple-600">40-50% smaller</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Browser Support</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>WebP:</span>
                    <span className="font-semibold text-green-600">95%+ browsers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AVIF:</span>
                    <span className="font-semibold text-orange-600">85%+ browsers</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">Recommended Strategy:</h2>
            <p className="mb-6 text-gray-700">
              The choice between WebP and AVIF depends on your specific needs:
            </p>

            <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">Recommended Strategy:</h3>
              <ol className="space-y-2 text-gray-700">
                <li>1. Use AVIF if your priority is image quality and compression.</li>
                <li>2. Use WebP as an alternative.</li>
                <li>3. Use JPEG if you are working with older browsers.</li>
                <li>4. Use the HTML picture element to automatically pick the preferred format.</li>
              </ol>
            </div>

            <h2 className="mb-6 mt-12 text-2xl font-bold text-gray-900">Implementation Tips</h2>
            <p className="mb-6 text-gray-700">
              Use the picture element with AVIF and WebP for progressive feature enhancement, along with the best formats supported to maximize performance. This will also ensure compatibility is maintained across all devices and browsers.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
