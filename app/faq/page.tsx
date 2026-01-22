import type React from "react"
import type { Metadata } from "next"
import { Check } from "lucide-react"
import { generateFAQSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions About Image Compression | Image Compressor",
  description: "Find answers to common questions about our free image compression service, supported formats, compression quality, privacy, and features. Learn how to compress JPG, PNG, WebP, AVIF images.",
  keywords: "image compression FAQ, how to compress images, image formats, lossless compression, lossy compression, image quality, free image compressor",
  openGraph: {
    title: "FAQ - Image Compression Questions Answered",
    description: "Find answers to common questions about our free image compression service.",
    type: "website",
    url: "https://picsreduce.com/faq",
    siteName: "PicsReduce",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Image Compression Questions Answered",
    description: "Find answers to common questions about our free image compression service.",
    creator: "@picsreduce",
  },
  alternates: {
    canonical: "https://picsreduce.com/faq",
  },
}

interface FAQItem {
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    question: "Is your image compression service free?",
    answer:
      "Yes! All features—compression, format conversion, bulk download—are 100% free with no hidden costs, watermarks, or signup requirements.",
  },
  {
    question: "What image formats can I compress?",
    answer: (
      <div>
        <p>You can compress any image format including:</p>
        <ul className="mt-2 space-y-1 list-inside">
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>JPG, PNG, WebP, AVIF, HEIC, BMP, TIFF, APNG, and more.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "What images formats can I convert to?",
    answer: (
      <div>
        <p>You can convert your image to:</p>
        <ul className="mt-2 space-y-1 list-inside">
          {["JPEG", "PNG", "WebP", "AVIF"].map((format) => (
            <li key={format} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{format}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm italic">Support for additional output formats is coming soon.</p>
      </div>
    ),
  },
  {
    question: "Is image quality preserved after compression?",
    answer:
      "Yes. We use intelligent lossy compression techniques that reduce file size with no visible drop in image quality. Your visuals stay sharp while your page load gets faster.",
  },
  {
    question: "Do you support HEIC and AVIF formats?",
    answer:
      "Yes! We auto-convert HEIC to JPG (for universal compatibility) and also support AVIF, a next-gen format offering superior compression and quality.",
  },
  {
    question: "How long do you store uploaded images?",
    answer:
      "All uploads are secure and temporary. We don't store your images. All processing happens locally in your browser for maximum privacy.",
  },
  {
    question: "Do you support bulk image processing?",
    answer:
      "Yes! Upload multiple images at once and download all optimized results together. Super efficient for developers, marketers, and content creators.",
  },
  {
    question: "What's the difference between lossless and lossy compression?",
    answer:
      "Lossless compression reduces file size without any quality loss, perfect for professional work. Lossy compression achieves greater size reduction with minimal visible quality impact, ideal for web use.",
  },
  {
    question: "What is the maximum file size I can compress?",
    answer:
      "You can compress images up to 30MB per file, completely free with no limitations or premium plans required.",
  },
   {
    question: "How to resize a JPG image?",
    answer: "Using our Image Compressor Tool (picsreduce), you can easily resize a JPG image. Just upload your image and resize up to 90%,",
  },
  {
    question: "How to compress a JPG image?",
    answer: "With our Image Compressor Tool picsreduce, compressing a JPG is simple. Upload your image, choose the compression level, and download a smaller file without losing noticeable quality. Its fast, efficient, and works for single or bulk images.",
  },
]

// For schema markup - extract plain text answers
const faqSchemaData = [
  {
    question: "Is your image compression service free?",
    answer: "Yes! All features—compression, format conversion, bulk download—are 100% free with no hidden costs, watermarks, or signup requirements.",
  },
  {
    question: "What image formats can I compress?",
    answer: "You can compress any image format including JPG, PNG, WebP, AVIF, HEIC, BMP, TIFF, APNG, and more.",
  },
  {
    question: "What formats can I convert images to?",
    answer: "You can convert your images to JPEG, PNG, WebP, and AVIF formats.",
  },
  {
    question: "Is image quality preserved after compression?",
    answer: "Yes. We use intelligent lossy compression techniques that reduce file size with no visible drop in image quality. Your visuals stay sharp while your page load gets faster.",
  },
  {
    question: "Do you support HEIC and AVIF formats?",
    answer: "Yes! We auto-convert HEIC to JPG (for universal compatibility) and also support AVIF, a next-gen format offering superior compression and quality.",
  },
  {
    question: "How long do you store uploaded images?",
    answer: "All uploads are secure and temporary. We don't store your images. All processing happens locally in your browser for maximum privacy.",
  },
  {
    question: "Do you support bulk image processing?",
    answer: "Yes! Upload multiple images at once and download all optimized results together. Super efficient for developers, marketers, and content creators.",
  },
  {
    question: "What's the difference between lossless and lossy compression?",
    answer: "Lossless compression reduces file size without any quality loss, perfect for professional work. Lossy compression achieves greater size reduction with minimal visible quality impact, ideal for web use.",
  },
  {
    question: "How to resize a JPG image?",
    answer: "Using our Image Compressor Tool (picsreduce), you can easily resize a JPG image. Just upload your image and resize up to 90%,",
  },
  {
    question: "How to compress a JPG image?",
    answer: "With our Image Compressor Tool picsreduce, compressing a JPG is simple. Upload your image, choose the compression level, and download a smaller file without losing noticeable quality. Its fast, efficient, and works for single or bulk images.",
  },
  {
    question: "What is the maximum file size I can compress?",
    answer: "You can compress images up to 30MB per file, completely free with no limitations or premium plans required.",
  },
]

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqSchemaData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" role="main">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 pt-8">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our free image compression service, supported formats, and features
            </p>
          </header>

          <div className="max-w-3xl mx-auto space-y-10" itemScope itemType="https://schema.org/FAQPage">
            {faqItems.map((item, index) => (
              <article 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2" itemProp="name">{item.question}</h2>
                <div className="text-gray-700" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">{item.answer}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
