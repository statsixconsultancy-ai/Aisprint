import { createClient } from "@supabase/supabase-js"
import { Blog, Category, BlogWithCategory } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("getAllCategories error:", error)
    return []
  }

  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("getCategoryBySlug error:", error)
    return null
  }

  return data ?? null
}

// ─────────────────────────────────────────────
// Blogs
// ─────────────────────────────────────────────

export async function getLatestBlogs(
  limit: number = 6
): Promise<BlogWithCategory[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!inner(name)
    `)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("getLatestBlogs error:", error)
    return []
  }

  return (data ?? []).map((blog: any) => ({
    ...blog,
    category_name: blog.blog_categories?.name ?? "Uncategorized",
  }))
}

export async function getFeaturedBlog(): Promise<BlogWithCategory | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!inner(name)
    `)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("getFeaturedBlog error:", error)
    return null
  }

  if (!data) return null

  return {
    ...data,
    category_name: (data as any).blog_categories?.name ?? "Uncategorized",
  }
}

export async function getBlogsByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{ blogs: BlogWithCategory[]; total: number }> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { count } = await supabase
    .from("blogs")
    .select("*", { count: "exact", head: true })
    .eq("category_slug", categorySlug)
    .eq("status", "published")

  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!inner(name)
    `)
    .eq("category_slug", categorySlug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("getBlogsByCategory error:", error)
    return { blogs: [], total: 0 }
  }

  return {
    blogs: (data ?? []).map((blog: any) => ({
      ...blog,
      category_name: blog.blog_categories?.name ?? "Uncategorized",
    })),
    total: count ?? 0,
  }
}

export async function getBlogBySlug(
  categorySlug: string,
  blogSlug: string
): Promise<BlogWithCategory | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!inner(name)
    `)
    .eq("category_slug", categorySlug)
    .eq("slug", blogSlug)
    .eq("status", "published")
    .maybeSingle()

  if (error) {
    console.error("getBlogBySlug error:", error)
    return null
  }

  if (!data) return null

  return {
    ...data,
    category_name: (data as any).blog_categories?.name ?? "Uncategorized",
  }
}

export async function getRelatedBlogs(
  categorySlug: string,
  currentBlogId: string,
  limit: number = 3
): Promise<BlogWithCategory[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!inner(name)
    `)
    .eq("category_slug", categorySlug)
    .eq("status", "published")
    .neq("id", currentBlogId)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("getRelatedBlogs error:", error)
    return []
  }

  return (data ?? []).map((blog: any) => ({
    ...blog,
    category_name: blog.blog_categories?.name ?? "Uncategorized",
  }))
}