import Link from 'next/link'
import { Category } from '@/lib/blog/types'

interface CategoryNavProps {
  categories: Category[]
  activeSlug?: string
}

export default function CategoryNav({ categories, activeSlug }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-3 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
          !activeSlug
            ? 'bg-brand-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/${category.slug}`}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            activeSlug === category.slug
              ? 'bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}