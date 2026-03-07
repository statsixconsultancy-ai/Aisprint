import { MetadataRoute } from "next"
import { getAllCategories, getLatestBlogs } from "@/lib/blog/supabase-queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

const baseUrl = "https://www.goaisprint.com"

// -----------------------------
// Static Pages
// -----------------------------
const staticPages: MetadataRoute.Sitemap = [
{
url: `${baseUrl}`,
lastModified: new Date(),
changeFrequency: "weekly",
priority: 1.0,
},
{
url: `${baseUrl}/courses`,
lastModified: new Date(),
changeFrequency: "weekly",
priority: 0.9,
},
{
url: `${baseUrl}/contact`,
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.8,
},
{
url: `${baseUrl}/ml-ai`,
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.8,
},
{
url: `${baseUrl}/prompt-engineering`,
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.8,
},
{
url: `${baseUrl}/ml-ai/apply`,
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.7,
},
{
url: `${baseUrl}/prompt-engineering/apply`,
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.7,
},
{
url: `${baseUrl}/policies/privacy`,
lastModified: new Date(),
changeFrequency: "yearly",
priority: 0.5,
},
{
url: `${baseUrl}/policies/terms`,
lastModified: new Date(),
changeFrequency: "yearly",
priority: 0.5,
},
{
url: `${baseUrl}/policies/refund`,
lastModified: new Date(),
changeFrequency: "yearly",
priority: 0.5,
},
]

// -----------------------------
// Blog Home
// -----------------------------
const blogHome: MetadataRoute.Sitemap = [
{
url: `${baseUrl}/blog`,
lastModified: new Date(),
changeFrequency: "daily",
priority: 0.9,
},
]

// -----------------------------
// Blog Categories
// -----------------------------
const categories = await getAllCategories()

const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
url: `${baseUrl}/blog/${cat.slug}`,
lastModified: new Date(),
changeFrequency: "weekly",
priority: 0.8,
}))

// -----------------------------
// Blog Posts
// -----------------------------
const blogs = await getLatestBlogs(500)

const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
url: `${baseUrl}/blog/${blog.category_slug}/${blog.slug}`,
lastModified: blog.updated_at
? new Date(blog.updated_at)
: new Date(),
changeFrequency: "monthly",
priority: 0.7,
}))

// -----------------------------
// Return All Routes
// -----------------------------
return [
...staticPages,
...blogHome,
...categoryPages,
...blogPages,
]
}
