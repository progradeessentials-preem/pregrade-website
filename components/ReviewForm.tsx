"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useReviews } from "@/lib/reviews-store";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const { addReview } = useReviews();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    if (!author.trim() || !title.trim() || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addReview({
      productId,
      author: author.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verified: Math.random() > 0.3, // 70% chance of verified
    });

    toast.success("Review submitted!", {
      description: "Thank you for your feedback!",
    });

    // Reset form
    setRating(0);
    setAuthor("");
    setTitle("");
    setComment("");
    setIsSubmitting(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Share Your Experience</h3>
          <p className="text-gray-400 mb-4">
            Have you used The Pocket Scope? Help other collectors by sharing your review
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-6">Write Your Review</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600 hover:text-gray-500"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-gray-300 self-center">
                  {rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name <span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Review Title <span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your experience"
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Review Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Review <span className="text-red-400">*</span>
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with The Pocket Scope. What did you like? How has it helped your collection?"
              rows={6}
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum 50 characters ({comment.length}/50)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || comment.length < 50}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
