import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { blogPosts, getBlogPostById } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `https://pregradeessentials.com/blog/${post.id}`;

  return {
    title: `${post.title} | PreGrade Essentials Blog`,
    description: post.excerpt,
    keywords: [
      post.title,
      post.category,
      "card authentication",
      "PSA grading",
      "sports cards",
      "Pokemon TCG",
      "card collecting",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      siteName: "PreGrade Essentials",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // Article Schema (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://pregradeessentials.com${post.image || '/blog-default.png'}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "PreGrade Essentials",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pregradeessentials.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pregradeessentials.com/blog/${post.id}`
    },
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pregradeessentials.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://pregradeessentials.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://pregradeessentials.com/blog/${post.id}`
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border/40">
          <div className="container-padding mx-auto max-w-4xl py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="container-padding mx-auto max-w-4xl py-12">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="container-padding mx-auto max-w-4xl pb-16">
          <Card className="glass-strong">
            <CardContent className="prose prose-invert max-w-none p-8 md:p-12">
              <div className="whitespace-pre-wrap text-base leading-relaxed">
                {post.content}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border/40 bg-card/30 py-16">
            <div className="container-padding mx-auto max-w-7xl">
              <h2 className="mb-8 text-3xl font-bold">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="glass group hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 text-6xl text-center">
                        {relatedPost.image}
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {relatedPost.category}
                      </Badge>
                      <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
