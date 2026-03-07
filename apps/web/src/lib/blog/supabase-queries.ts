import { createClient } from '@supabase/supabase-js'
import { Blog, Category, BlogWithCategory } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Categories ──────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ─── Blogs ───────────────────────────────────────────────────

export async function getLatestBlogs(limit: number = 6): Promise<BlogWithCategory[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      category_name:blog_categories(name)
    `)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  // Transform nested category_name object
  return (data || []).map((blog) => ({
    ...blog,
    category_name: blog.category_name?.name || 'Uncategorized',
  }))
}

export async function getFeaturedBlog(): Promise<BlogWithCategory | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      category_name:blog_categories(name)
    `)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  if (!data) return null

  return {
    ...data,
    category_name: data.category_name?.name || 'Uncategorized',
  }
}

export async function getBlogsByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{ blogs: BlogWithCategory[]; total: number }> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Get total count
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true })
    .eq('category_slug', categorySlug)
    .eq('status', 'published')

  // Get paginated data
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      category_name:blog_categories(name)
    `)
    .eq('category_slug', categorySlug)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) throw error

  return {
    blogs: (data || []).map((blog) => ({
      ...blog,
      category_name: blog.category_name?.name || 'Uncategorized',
    })),
    total: count || 0,
  }
}

export async function getBlogBySlug(
  categorySlug: string,
  blogSlug: string
): Promise<BlogWithCategory | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      category_name:blog_categories(name)
    `)
    .eq('category_slug', categorySlug)
    .eq('slug', blogSlug)
    .eq('status', 'published')
    .single()

  if (error && error.code !== 'PGRST116') throw error
  if (!data) return null

  return {
    ...data,
    category_name: data.category_name?.name || 'Uncategorized',
  }
}

export async function getRelatedBlogs(
  categorySlug: string,
  currentBlogId: string,
  limit: number = 3
): Promise<BlogWithCategory[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      category_name:blog_categories(name)
    `)
    .eq('category_slug', categorySlug)
    .eq('status', 'published')
    .neq('id', currentBlogId)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return (data || []).map((blog) => ({
    ...blog,
    category_name: blog.category_name?.name || 'Uncategorized',
  }))
}