import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blogs", "/blogs/*", "/faq"],
      disallow: [
        "/api/",
        "/admin/",
        "/compress-jpg",
        "/compress-png",
        "/compress-webp",
        "/compress-gif",
        "/compress-svg",
        "/compress-avif",
        "/terms",
        "/privacy",
        "/about",
      ],
    },
    sitemap: "https://picsreduce.com/sitemap.xml",
  }
}
