import Link from "next/link";
import { Download, FileText, Video, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Product Manuals | PreGrade Essentials",
  description: "User guides, quick start manuals, and video tutorials for all PreGrade Essentials card authentication tools.",
};

const manuals = [
  {
    id: "pocket-scope",
    name: "The Pocket Scope",
    description: "Complete user guide for The Pocket Scope - your portable card authentication tool",
    icon: "🔬",
    downloads: [
      { type: "Quick Start Guide", format: "PDF", size: "2.5 MB" },
      { type: "Full User Manual", format: "PDF", size: "8.2 MB" },
      { type: "Video Tutorial", format: "MP4", size: "45 MB" },
    ],
    topics: [
      "Getting Started & Setup",
      "UV Light Authentication",
      "Magnification Levels (50X-200X)",
      "Defect Detection Techniques",
      "Image Capture & Storage",
      "Battery Care & Maintenance",
      "Troubleshooting Common Issues",
    ],
  },
  {
    id: "grading-station",
    name: "The Grading Station Pro",
    description: "Professional setup and calibration guide for optimal card grading accuracy",
    icon: "🏢",
    downloads: [
      { type: "Quick Start Guide", format: "PDF", size: "3.1 MB" },
      { type: "Full User Manual", format: "PDF", size: "12.4 MB" },
      { type: "Calibration Video", format: "MP4", size: "67 MB" },
    ],
    topics: [
      "Unboxing & Assembly",
      "Lighting Setup & Calibration",
      "Workspace Optimization",
      "Centering Measurement Tools",
      "Surface Analysis Techniques",
      "Advanced Features Guide",
      "Maintenance Schedule",
    ],
  },
  {
    id: "card-measuring",
    name: "Precision Measuring Tools",
    description: "Accurate measurement techniques for centering and dimension analysis",
    icon: "📏",
    downloads: [
      { type: "Quick Reference", format: "PDF", size: "1.8 MB" },
      { type: "User Manual", format: "PDF", size: "5.6 MB" },
      { type: "Tutorial Video", format: "MP4", size: "28 MB" },
    ],
    topics: [
      "Tool Calibration",
      "Centering Calculations",
      "Border Measurement",
      "Recording Measurements",
      "Interpreting Results",
      "Care & Storage",
    ],
  },
];

export default function ManualsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900/50 to-transparent" />
          <div className="container-padding relative mx-auto max-w-7xl py-24 md:py-32">
            <div className="text-center space-y-6">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
                Complete Documentation Library
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block text-white mb-2">Master Your</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Card Authentication Tools
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Step-by-step guides, video tutorials, and expert tips for all PreGrade Essentials products.
                <span className="text-white font-semibold"> Get the most from your investment.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Manuals Grid */}
        <section className="relative bg-gray-900 py-24 md:py-32">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="space-y-12">
              {manuals.map((manual, index) => (
                <div
                  key={manual.id}
                  className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20"
                >
                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    {/* Product Info */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="text-7xl mb-4">{manual.icon}</div>
                      <h2 className="text-3xl font-bold text-white">
                        {manual.name}
                      </h2>
                      <p className="text-base text-gray-400 leading-relaxed">
                        {manual.description}
                      </p>

                      {/* Topics Covered */}
                      <div className="pt-4">
                        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                          Topics Covered
                        </h3>
                        <ul className="space-y-2">
                          {manual.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="text-emerald-400 mt-0.5">✓</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-xl font-bold text-white mb-6">
                        Available Downloads
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {manual.downloads.map((download, i) => (
                          <div
                            key={i}
                            className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:bg-gray-900/80"
                          >
                            <div className="flex items-start gap-3 mb-4">
                              {download.format === "MP4" ? (
                                <Video className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                              ) : (
                                <FileText className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white text-sm mb-1">
                                  {download.type}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-600 text-xs">
                                    {download.format}
                                  </Badge>
                                  <span>{download.size}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 hover:scale-105"
                              size="sm"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="relative border-t border-gray-800 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
          <div className="container-padding relative mx-auto max-w-4xl text-center">
            <div className="mb-8 text-6xl">💬</div>
            <Badge className="mb-6 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-semibold px-4 py-2">
              Need Additional Help?
            </Badge>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
              Our Experts Are <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Here To Help</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Can't find what you're looking for? Have questions about a specific feature? Our card authentication specialists are ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/30"
                asChild
              >
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800/50 font-semibold px-8"
                asChild
              >
                <Link href="/blog">
                  Browse Tutorials
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
