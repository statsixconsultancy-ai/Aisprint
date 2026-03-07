import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import {
getAllCategories,
getLatestBlogs,
getFeaturedBlog,
} from "@/lib/blog/supabase-queries"

import BlogCard from "./components/BlogCard"
import CategoryNav from "./components/CategoryNav"

export const metadata: Metadata = {
title: "AI & Career Blog | GoAI Sprint",
description:
"Expert insights on AI, prompt engineering, and career development.",
}

export const revalidate = 0

export default async function BlogHomePage() {
  let categories: any[] = [];
  let latestBlogs: any[] = [];
  let featuredBlog: any = null;
  try {
    const [cats, blogs, featured] = await Promise.all([
      getAllCategories(),
      getLatestBlogs(6),
      getFeaturedBlog(),
    ]);
    categories = cats || [];
    latestBlogs = blogs || [];
    featuredBlog = featured || null;
  } catch (error) {
    console.error("BLOG FETCH ERROR:", error);
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="container-custom max-w-6xl py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">AI & Career Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical guides, industry trends, and expert advice to accelerate your AI journey.
          </p>
          <div className="mt-8">
            <CategoryNav categories={categories} />
          </div>
        </div>
      </section>
      {/* FEATURED BLOG */}
      {featuredBlog && (
        <section className="container-custom max-w-6xl py-12">
          <Link href={`/blog/${featuredBlog.category_slug}/${featuredBlog.slug}`} className="block group">
            <div className="grid md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow">
              <div className="relative h-[300px]">
                {featuredBlog.featured_image ? (
                  <Image src={featuredBlog.featured_image} alt={featuredBlog.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-sm text-blue-600 font-semibold mb-2">{featuredBlog.category_name}</span>
                <h2 className="text-3xl font-bold mb-4">{featuredBlog.title}</h2>
                <p className="text-gray-600 mb-4">{featuredBlog.excerpt}</p>
                <span className="text-blue-600 font-semibold">Read Article →</span>
              </div>
            </div>
          </Link>
        </section>
      )}
      {/* BLOG CONTENT */}
      <section className="container-custom max-w-6xl py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* BLOG LIST */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            {latestBlogs.length === 0 ? (
              <p className="text-gray-500">No blog posts yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {latestBlogs.map((blog: any) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            )}
          </div>
          {/* SIDEBAR */}
          <aside>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat: any) => (
                  <li key={cat.slug}>
                    <Link href={`/blog/${cat.slug}`} className="text-gray-600 hover:text-blue-600">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
