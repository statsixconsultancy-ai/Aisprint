export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string | null
  category_slug: string
  author: string
  meta_title: string | null
  meta_description: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface BlogWithCategory extends Blog {
  category_name: string
}

export interface BlogCardProps {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category_slug: string
  category_name: string
  author: string
  published_at: string | null
}