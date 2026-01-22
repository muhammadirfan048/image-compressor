import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://picsreduce.com'),
  title: {
    default: 'Free Image Compressor - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
    template: '%s | Image Compressor',
  },
  description:
    'Compress images online for free with our advanced picsreduce tool. Reduce file size of JPG, PNG, GIF, WebP, AVIF, and SVG by up to 90% while maintaining quality. Fast, secure, browser-based compression with no uploads required.',
keywords: [
  'image compressor',
  'picsreduce',
  'image compressor to 50kb',
  'image compressor to 20kb',
  'compress images online',
  'compress image online',
  'compress image',
  'compress image free',
  'compress image for web',
  'reduce image file size',
  'reduce image size',
  'reduce image size in kb',
  'resize image',
  'resize image online',
  'resize image online free',
  'free image compressor',
  'free resize image online',
  'free image optimizer',
  'optimize images for web',
  'image optimization tool',
  'image optimizer tools',
  'image compression tool',
  'image compression tools',
  'bulk image optimizer',
  'bulk image compression',
  'bulk image compressor',
  'photo compressor',
  'online image resizer',
  'jpg compressor',
  'jpg optimizer',
  'png compressor',
  'png optimizer',
  'webp converter',
  'webp compressor',
  'avif converter',
  'avif compressor',
  'lossless image compression',
  'high-quality image compressor',
  'best image compressor online',
  'fast image compressor',
  'reduce photo size online',
  'compress photos for website',
  'image size reducer tool'
],

  authors: [{ name: 'picsreduce Team' }],
  creator: 'Pixreduce',
  publisher: 'Pixreduce',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://picsreduce.com',
    siteName: 'PicsReduce',
    title: 'Free Image Compressor - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
    description:
      'Compress images online for free. Reduce file size by up to 90% while maintaining quality.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PicsReduce - Free Online Image Compression Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Compressor - Compress JPG, PNG, GIF, SVG Online | 90% Size Reduction',
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
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />
        
        {/* Favicon Links */}
        <link rel="icon" type="image/x-icon" href="/favicon-for-public/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon-for-public/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-for-public/favicon-48-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-for-public/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-for-public/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon-for-public/site.webmanifest" />
      </head>
      <body className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50">
        <header>
          <div className="py-6">
            <Navbar />
          </div>
        </header>
        {children}
        <Toaster />

        <footer className="mt-16 bg-gray-900 py-12 text-white" role="contentinfo">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold">picsreduce</h3>
                <p className="text-gray-400">
                  Free online tool to compress and optimize your images with our image optimizer tool pixreduce.
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-lg font-semibold">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/faq" className="transition-colors hover:text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="transition-colors hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-lg font-semibold">Tools</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/" className="transition-colors hover:text-white">
                      Image Compressor
                    </a>
                  </li>
                  <li>
                    <a href="/" className="transition-colors hover:text-white">
                      Format Converter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2025 pixreducer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
