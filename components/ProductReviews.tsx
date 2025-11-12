"use client";

import { useState } from "react";
import { Star, ThumbsUp, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useReviews, type Review } from "@/lib/reviews-store";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const {
    getReviewsByProduct,
    getAverageRating,
    getRatingDistribution,
    markHelpful
  } = useReviews();

  const [sortBy, setSortBy] = useState<"recent" | "highest" | "helpful">("recent");

  const reviews = getReviewsByProduct(productId);
  const averageRating = getAverageRating(productId);
  const distribution = getRatingDistribution(productId);

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else {
      return b.helpful - a.helpful;
    }
  });

  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-800 bg-gray-900 py-16 md:py-24">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-2">Customer Reviews</h2>
          <p className="text-gray-400">Real feedback from verified collectors and dealers</p>
        </div>

        {/* Rating Summary */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Average Rating */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 my-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400">Based on {totalReviews} reviews</p>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="md:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = distribution[rating];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-sm font-medium text-white">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-16 text-right">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-white">
            {totalReviews} Review{totalReviews !== 1 ? "s" : ""}
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => setSortBy("recent")}
              variant={sortBy === "recent" ? "default" : "outline"}
              className={
                sortBy === "recent"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
              }
              size="sm"
            >
              Most Recent
            </Button>
            <Button
              onClick={() => setSortBy("highest")}
              variant={sortBy === "highest" ? "default" : "outline"}
              className={
                sortBy === "highest"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
              }
              size="sm"
            >
              Highest Rated
            </Button>
            <Button
              onClick={() => setSortBy("helpful")}
              variant={sortBy === "helpful" ? "default" : "outline"}
              className={
                sortBy === "helpful"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
              }
              size="sm"
            >
              Most Helpful
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onMarkHelpful={markHelpful} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ReviewCardProps {
  review: Review;
  onMarkHelpful: (reviewId: string) => void;
}

function ReviewCard({ review, onMarkHelpful }: ReviewCardProps) {
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);

  const handleMarkHelpful = () => {
    if (!hasMarkedHelpful) {
      onMarkHelpful(review.id);
      setHasMarkedHelpful(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30">
              <User className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{review.author}</span>
                {review.verified && (
                  <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400">{formatDate(review.date)}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-white mb-2">{review.title}</h4>

        {/* Comment */}
        <p className="text-gray-300 leading-relaxed mb-4">{review.comment}</p>

        {/* Footer */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
          <Button
            onClick={handleMarkHelpful}
            variant="ghost"
            size="sm"
            className={`gap-2 ${
              hasMarkedHelpful
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-gray-400 hover:text-white"
            }`}
            disabled={hasMarkedHelpful}
          >
            <ThumbsUp className={`h-4 w-4 ${hasMarkedHelpful ? "fill-current" : ""}`} />
            <span>Helpful ({review.helpful})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
