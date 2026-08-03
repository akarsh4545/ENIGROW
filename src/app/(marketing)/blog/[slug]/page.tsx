import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostContent } from "@/components/marketing/blog-post";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllBlogSlugs, getBlogPost } from "@/data/blog";
import { buildPageMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article" };

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            publishedAt: post.publishedAt,
            author: post.author,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <BlogPostContent post={post} />
    </>
  );
}
