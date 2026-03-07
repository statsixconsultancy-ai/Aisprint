import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogBySlug, getRelatedBlogs } from '@/lib/blog/supabase-queries'
import BlogCard from '../../components/BlogCard'

interface PageProps {
  params: { category: string; slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.category, params.slug)

  if (!blog) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = blog.meta_title || `${blog.title} | GoAI Sprint Blog`
  const description = blog.meta_description || blog.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: blog.published_at || undefined,
      modifiedTime: blog.updated_at,
      authors: [blog.author],
      images: blog.featured_image ? [blog.featured_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.featured_image ? [blog.featured_image] : [],
    },
    alternates: {
      canonical: `https://goaisprint.com/blog/${params.category}/${params.slug}`,
    },
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: PageProps) {
  const [blog, relatedBlogs] = await Promise.all([
    getBlogBySlug(params.category, params.slug),
    getBlogBySlug(params.category, params.slug).then((b) =>
      b ? getRelatedBlogs(params.category, b.id, 3) : []
    ),
  ])

  if (!blog) {
    notFound()
  }

  const formattedDate = new Date(blog.published_at || blog.created_at).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <article className="pt-16 min-h-screen">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            image: blog.featured_image,
            author: {
              '@type': 'Person',
              name: blog.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'GoAI Sprint',
              logo: {
                '@type': 'ImageObject',
                url: 'https://goaisprint.com/logo.png',
              },
            },
            datePublished: blog.published_at || blog.created_at,
            dateModified: blog.updated_at,
            description: blog.excerpt,
          }),
        }}
      />

      {/* Header */}
      <header className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-body">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-brand-600">
              Blog
            </Link>
            <span>›</span>
            <Link href={`/blog/${params.category}`} className="hover:text-brand-600">
              {blog.category_name}
            </Link>
            <span>›</span>
            <span className="text-gray-700">{blog.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <Link href={`/blog/${params.category}`}>
              <span className="badge-blue">{blog.category_name}</span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="section-heading mb-6">{blog.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-body">
            <span>{blog.author}</span>
            <span>•</span>
            <time dateTime={blog.published_at || blog.created_at}>{formattedDate}</time>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.featured_image && (
        <div className="container-custom max-w-4xl mt-8">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container-custom max-w-4xl py-12">
        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="container-custom max-w-6xl py-12 border-t border-gray-200">
          <h2 className="font-heading text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard key={relatedBlog.id} {...relatedBlog} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}