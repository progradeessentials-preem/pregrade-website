import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  date: string;
  helpful: number;
}

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getRatingDistribution: (productId: string) => Record<number, number>;
  markHelpful: (reviewId: string) => void;
}

// Sample reviews for demo
const sampleReviews: Review[] = [
  {
    id: "1",
    productId: "pocket-scope",
    author: "Mike Johnson",
    rating: 5,
    title: "Game changer for PSA authentication",
    comment: "I've been collecting for 15 years and this is hands down the best tool I've ever used. Caught a fake PSA 10 Jordan rookie at a card show last week - the UV light revealed missing security marks. Paid for itself immediately. The magnification is crystal clear and the display makes it easy to share findings with sellers.",
    verified: true,
    date: "2025-10-28",
    helpful: 24,
  },
  {
    id: "2",
    productId: "pocket-scope",
    author: "Sarah Martinez",
    rating: 5,
    title: "Essential for serious collectors",
    comment: "Bought this before sending cards to PSA and saved hundreds in grading fees. Found surface scratches on cards I thought were mint. The 14x magnification shows EVERYTHING. Battery life is great, and the case is perfect for traveling to shows. Worth every penny.",
    verified: true,
    date: "2025-10-25",
    helpful: 18,
  },
  {
    id: "3",
    productId: "pocket-scope",
    author: "David Chen",
    rating: 4,
    title: "Great tool, minor learning curve",
    comment: "Really impressed with the build quality and magnification. The UV light is a fantastic feature for authentication. Only complaint is it takes a bit of practice to hold it steady at the right distance. Once you get the hang of it, it's amazing. Highly recommend for anyone buying high-value cards.",
    verified: true,
    date: "2025-10-22",
    helpful: 12,
  },
  {
    id: "4",
    productId: "pocket-scope",
    author: "Jennifer Adams",
    rating: 5,
    title: "Dealer's best friend",
    comment: "As a full-time card dealer, this scope has become essential. I use it at every show and for every online purchase over $100. The ability to see micro-scratches and edge wear instantly is incredible. Customers appreciate the transparency too - I can show them exactly what they're buying. The UV feature gives buyers confidence in my graded cards.",
    verified: true,
    date: "2025-10-18",
    helpful: 31,
  },
  {
    id: "5",
    productId: "pocket-scope",
    author: "Robert Taylor",
    rating: 5,
    title: "Perfect for pre-grading inspection",
    comment: "I grade about 50 cards a month with PSA. This scope has significantly improved my submission quality. I can now identify cards that won't get 10s before wasting grading fees. The display is bright and clear, magnification levels are perfect, and it's incredibly portable. Best $75 I've spent on my collection.",
    verified: true,
    date: "2025-10-15",
    helpful: 15,
  },
  {
    id: "6",
    productId: "pocket-scope",
    author: "Amanda White",
    rating: 4,
    title: "Excellent value for money",
    comment: "Very satisfied with this purchase. The magnification is excellent for the price point. I've been using it for Pokemon card inspection and it reveals printing lines and edge whitening that I completely missed with my old loupe. The rechargeable battery is convenient. Would give 5 stars if the case was included, but still a great buy.",
    verified: false,
    date: "2025-10-12",
    helpful: 9,
  },
  {
    id: "7",
    productId: "pocket-scope",
    author: "Chris Anderson",
    rating: 5,
    title: "Caught a fake immediately",
    comment: "Received this on Monday, used it at a local card shop on Tuesday, and immediately spotted a counterfeit BGS slab. The UV light showed the authentication marks were completely wrong. Shop owner was grateful and removed the card. This scope has already saved me from making a $500 mistake. Cannot recommend enough!",
    verified: true,
    date: "2025-10-08",
    helpful: 28,
  },
  {
    id: "8",
    productId: "pocket-scope",
    author: "Emily Rodriguez",
    rating: 5,
    title: "Must-have for vintage collectors",
    comment: "Collecting vintage baseball cards is my passion, and this scope has transformed how I buy. I can see every detail of the card surface - from print dots to paper quality. The UV light helps verify holder authenticity on my PSA vintage cards. Compact, powerful, and absolutely worth it. Every serious collector needs one of these.",
    verified: true,
    date: "2025-10-05",
    helpful: 14,
  },
];

export const useReviews = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: sampleReviews,

      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
          helpful: 0,
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      getReviewsByProduct: (productId) => {
        return get().reviews.filter((review) => review.productId === productId);
      },

      getAverageRating: (productId) => {
        const productReviews = get().getReviewsByProduct(productId);
        if (productReviews.length === 0) return 0;

        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / productReviews.length;
      },

      getRatingDistribution: (productId) => {
        const productReviews = get().getReviewsByProduct(productId);
        const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        productReviews.forEach((review) => {
          distribution[review.rating]++;
        });

        return distribution;
      },

      markHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          ),
        }));
      },
    }),
    {
      name: "pregrade-reviews",
    }
  )
);
