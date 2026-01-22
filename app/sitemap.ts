import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https:picsreduce.com"
  const currentDate = new Date()

  // Blog posts with their publication dates
  const blogPosts = [
    {
      slug: "image-compression-guide",
      lastModified: new Date("2024-12-01"),
      priority: 0.8,
    },
    {
      slug: "webp-vs-avif-comparison",
      lastModified: new Date("2024-11-15"),
      priority: 0.8,
    },
    {
      slug: "seo-image-optimization",
      lastModified: new Date("2024-11-10"),
      priority: 0.8,
    },
    {
      slug: "bulk-image-processing",
      lastModified: new Date("2024-11-05"),
      priority: 0.7,
    },
    {
      slug: "mobile-image-optimization",
      lastModified: new Date("2024-11-01"),
      priority: 0.7,
    },
  ]

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Main pages
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: "monthly" as const,
      priority: post.priority,
    })),
  ]
}
