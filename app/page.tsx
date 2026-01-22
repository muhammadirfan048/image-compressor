import type { Metadata } from 'next'
import ImageCompressor from '@/components/image-compressor'
import { generateStructuredData } from '@/lib/seo'
import { Check, Zap, Shield, Upload, Download, Sparkles } from 'lucide-react'
import ReviewsCarousel from '@/components/reviews-carousel'
import bgimage from '@/public/heroimage.jpeg';

export const metadata: Metadata = {
  title: 'Best picture resizer - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
  description:
    'Compress images online for free with our advanced picsreduce tool. Reduce image size of JPG, PNG, GIF, WebP, AVIF, and SVG by up to 90% while maintaining quality. Fast, secure, browser-based compression with no uploads required.',
  keywords:
    'Best picture resizer,image compressor, compress images online, reduce image size, optimize images for web, JPG compressor, PNG compressor, WebP converter, AVIF converter, free image optimizer, bulk image compression, lossless image compression',
  openGraph: {
    title: 'Best picture resizer - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
    description: 'Compress images online for free. Reduce file size by up to 90% while maintaining quality. No uploads, 100% secure.',
    type: 'website',
    url: 'https://picsreduce.com',
    siteName: 'PicsReduce',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PicsReduce - Free Online Image Compression Tool',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best picture resizer - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
    description: 'Compress images online for free. Reduce file size by up to 90% while maintaining quality.',
    images: ['/og-image.jpg'],
    creator: '@picsreduce',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://picsreduce.com',
  },
}

export default function HomePage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen" role="main">
        {/* Hero Section */}
        <div
          className="relative mb-5 overflow-hidden min-h-[600px] bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50"
        
        >
          <div className="absolute inset-0 " />
          <div className="container relative mx-auto px-4 py-2 md:py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="md-mt-20 mb-6 mt-10 inline-flex animate-bounce items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                <Sparkles className="h-4 w-4" />
                100% Free • No Sign-up Required
              </div>

              <h1 className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
                Best picture resizer- Reduce Image Size by 90%
              </h1>

              <h4 className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600">
                Compress and optimize JPG, PNG, GIF, WebP, AVIF, and SVG images online for free. Our advanced compression technology reduces image sizes by up to 90% while maintaining exceptional quality. No uploads required - all processing happens in your browser.
              </h4>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-green-500" />
                  Up to 30MB per file
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  100% Secure & Private
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  Lightning Fast
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Compressor Tool */}
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ImageCompressor />
          </div>
        </div>

        {/* Features Section */}
        <section className="border-y border-gray-200 bg-white/50 backdrop-blur-sm" aria-labelledby="features-heading">
          <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 id="features-heading" className="mb-4 text-4xl font-bold text-gray-900">
                  Why Choose Our Free picsreduce?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Experience the best online image compression tool with advanced algorithms, complete privacy, and support for all major image formats including WebP and AVIF and resize 10mb imges to 100kb without reducing quality.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    All Formats Supported
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    Compress JPG, PNG, GIF, WebP, HEIC, SVG, PSD, RAW, BMP, AVIF and more. No format
                    restrictions or forced conversions.
                  </p>
                </div>

                <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 transition-transform duration-300 group-hover:scale-110">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Large File Support</h3>
                  <p className="leading-relaxed text-gray-600">
                    Upload files up to 30MB completely free. No hidden fees, no premium plans, no
                    limitations on file size.
                  </p>
                </div>

                <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Bulk Processing</h3>
                  <p className="leading-relaxed text-gray-600">
                    Process multiple images simultaneously with our advanced compression engine.
                    Download all files in one convenient zip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-heading">
          <div className="mx-auto max-w-4xl">
            <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
              <h2 id="about-heading" className="mb-8 text-center text-3xl font-bold text-gray-900">
                How Our picsreduce Technology Works
              </h2>

              <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Our picsreduce technology works with all formats and meticulously
                  compresses images. Whether you require delicate lossless compression for
                  professional-grade photography or aggressive compression for digital use, we cater
                  to all your needs.
                </p>

                <div className="my-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                    <Download className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    Understanding Lossless vs Lossy Compression
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">Lossless Compression</h4>
                      <p className="text-sm text-gray-600">
                        Best For professional work relying on every pixel. Removes data and reduces
                        file size while retained commensurate quality.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">Lossy Compression</h4>
                      <p className="text-sm text-gray-600">
                        Ideal for web use and storage optimization. Achieves maximum size reduction
                        with minimal visible quality impact.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">picsreduce Benefits</h3>
                    <ul className="space-y-3">
                      {[
                        'Reduce image file sizes by up to 90%',
                        'Maintain exceptional visual quality',
                        'Improve website loading speed and Core Web Vitals',
                        'Save storage space and reduce bandwidth costs',
                        'Boost SEO rankings with faster page speeds',
                        'Enhance mobile user experience',
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Supported Formats</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'JPG',
                        'PNG',
                        'GIF',
                        'WebP',
                        'HEIC',
                        'SVG',
                        'PSD',
                        'RAW',
                        'BMP',
                        'AVIF',
                        'TIFF',
                      ].map((format) => (
                        <span
                          key={format}
                          className="rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-bold text-blue-800 shadow-md transition-shadow hover:shadow-lg"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <ReviewsCarousel />
      </main>
    </>
  )
}
