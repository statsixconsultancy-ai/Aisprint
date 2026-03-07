import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getCategoryBySlug,
  getBlogsByCategory,
  getAllCategories,
} from "@/lib/blog/supabase-queries"

import BlogCard from "../components/BlogCard"
import CategoryNav from "../components/CategoryNav"

interface PageProps {
  params: {
    category: string
  }
  searchParams?: {
    page?: string
  }
}

/* -------------------------------------------------------
   Metadata
------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const category = await getCategoryBySlug(params.category)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} | GoAI Sprint Blog`,
    description:
      category.description ||
      `Read the latest posts in ${category.name}`,
    openGraph: {
      title: `${category.name} | GoAI Sprint Blog`,
      description:
        category.description ||
        `Read the latest posts in ${category.name}`,
      type: "website",
    },
  }
}

/* -------------------------------------------------------
   Disable cache in development
------------------------------------------------------- */

export const revalidate = 0

/* -------------------------------------------------------
   Page
------------------------------------------------------- */

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {

  const page = Number(searchParams?.page) || 1
  const pageSize = 12

  const [category, { blogs, total }, categories] =
    await Promise.all([
      getCategoryBySlug(params.category),
      getBlogsByCategory(params.category, page, pageSize),
      getAllCategories(),
    ])

  if (!category) {
    notFound()
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="pt-16 min-h-screen">

      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <section className="bg-white py-16">
        <div className="container-custom max-w-6xl">

          <h1 className="section-heading mb-4">
            {category.name}
          </h1>

          {category.description && (
            <p className="section-subheading max-w-2xl">
              {category.description}
            </p>
          )}

          <div className="mt-8">
            <CategoryNav
              categories={categories}
              activeSlug={params.category}
            />
          </div>

        </div>
      </section>

      {/* -------------------------------- */}
      {/* Blog Grid */}
      {/* -------------------------------- */}

      <section className="container-custom max-w-6xl section-padding">

        {blogs.length === 0 ? (

          <div className="text-center py-20">
            <p className="text-gray-500 font-body">
              No posts found in this category yet.
            </p>
          </div>

        ) : (

          <>
            {/* Blog Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  {...blog}
                />
              ))}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((pageNum) => (

                  <a
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pageNum === page
                        ? "bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </a>

                ))}

              </div>
            )}

          </>

        )}

      </section>

    </div>
  )
}