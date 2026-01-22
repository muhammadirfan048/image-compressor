// Organization Schema - Use globally
export function generateOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "picsreduce",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "Free online image compression and optimization tool",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@picsreduce.com",
    },
  }
}

// WebApplication Schema - For homepage
export function generateWebApplicationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "picsreduce",
    description:
      "Compress images online for free. Reduce file size of JPG, PNG, GIF, WebP, AVIF, and SVG images by up to 90% while maintaining quality.",
    url: siteUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "JPG/JPEG compression",
      "PNG compression",
      "GIF compression",
      "WebP conversion and compression",
      "AVIF conversion and compression",
      "SVG optimization",
      "HEIC to JPG conversion",
      "Bulk image processing",
      "Drag and drop upload",
      "Client-side processing",
      "Privacy protection - no server uploads",
      "Lossless and lossy compression",
    ],
    screenshot: `${siteUrl}/screenshot.jpg`,
    softwareVersion: "2.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "picsreduce Team",
    },
  }
}

// Article Schema - For blog posts
export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName = "picsreduce Team",
  keywords = [],
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  authorName?: string
  keywords?: string[]
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: `${siteUrl}/blog/${slug}/og-image.jpg`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "picsreduce",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    keywords: keywords.join(", "),
  }
}

// FAQ Schema - For FAQ page
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

// HowTo Schema - For tutorial content
export function generateHowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

// Combined structured data for homepage
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebApplicationSchema(),
    ],
  }
}

// SEO Helper: Generate canonical URL
export function getCanonicalUrl(path: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  return `${siteUrl}${path}`
}

// SEO Helper: Generate Open Graph image URL
export function getOGImageUrl(path: string = "/og-image.jpg"): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://picsreduce.com"
  return `${siteUrl}${path}`
}
