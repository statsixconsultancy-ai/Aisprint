import Link from 'next/link'
import Image from 'next/image'
import { BlogCardProps } from '@/lib/blog/types'

export default function BlogCard({
  title,
  slug,
  excerpt,
  featured_image,
  category_slug,
  category_name,
  author,
  published_at,
}: BlogCardProps) {
  const formattedDate = published_at
    ? new Date(published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unpublished';

  return (
    <article className="group card hover:shadow-lg transition-all duration-300">
      <Link href={`/blog/${category_slug}/${slug}`}>
        {/* Featured Image */}
        {featured_image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-3">
          <span className="badge-blue text-xs">{category_name}</span>
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-lg text-neutral-950 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 font-body line-clamp-3">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-body">
          <span>{author}</span>
          {published_at ? (
            <time dateTime={published_at}>{formattedDate}</time>
          ) : (
            <span>{formattedDate}</span>
          )}
        </div>
      </Link>
    </article>
  )
}