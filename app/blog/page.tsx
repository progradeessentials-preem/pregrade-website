import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog-posts";

export const metadata = {
  title: "Card Grading Blog - PSA Authentication, Defect Detection & Collecting Tips | PreGrade Essentials",
  description: "Expert guides on PSA card authentication, sports card grading mistakes, Pokemon TCG inspection, counterfeit detection, and pre-grading tools. Free tutorials from professional collectors and dealers.",
  keywords: "card grading tips, PSA authentication guide, sports card collecting, Pokemon card defects, counterfeit PSA slabs, pre-grading inspection, card show buying tips, TCG authentication, BGS grading, card magnifier reviews",
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/50 to-transparent" />
          <div className="container-padding relative mx-auto max-w-7xl py-24 md:py-32">
            <div className="text-center space-y-6">
              <Badge className="mb-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-semibold px-4 py-2">
                Card Collecting Knowledge Base
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block text-white mb-2">Learn From The</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Experts
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Master card authentication, defect detection, and investment strategies.
                <span className="text-white font-semibold"> Free guides to protect your collection.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col"
                >
                  {/* Post Image/Icon */}
                  <div className="relative p-8 text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                    <div className="text-7xl mb-4">{post.image}</div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative border-t border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent" />
          <div className="container-padding relative mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
              Join 10,000+ Collectors
            </Badge>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
              Get <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Expert Tips</span> Weekly
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Card authentication guides, defect detection tutorials, and investment strategies delivered to your inbox.
              <span className="text-white font-semibold"> Free.</span>
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 flex-1 rounded-xl border border-gray-700 bg-gray-800/50 px-6 text-base text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button className="h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/30">
                Subscribe Free
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
