# PreGrade Essentials - Product Landing Page

A modern, high-performance e-commerce landing page built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- ✅ **Modern Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- ✅ **Premium Design System**: Dark theme with electric blue/emerald accents
- ✅ **Fully Responsive**: Mobile-first design that works on all devices
- ✅ **Shopping Cart**: Persistent cart with Zustand state management
- ✅ **Product Catalog**: Dynamic product pages with detailed specifications
- ✅ **Blog System**: Built-in blog with markdown-style content
- ✅ **Contact Form**: Validated contact form with toast notifications
- ✅ **Checkout Flow**: Complete checkout process with order summary

### Design Features
- 🎨 Glass morphism effects
- 🎨 Gradient utilities and text gradients
- 🎨 Smooth transitions and hover effects
- 🎨 Custom color palette with OKLCH color space
- 🎨 Responsive typography system

### Performance
- ⚡ Static generation for optimal performance
- ⚡ Automatic code splitting
- ⚡ Optimized images and assets
- ⚡ Fast page loads with Next.js 15

## 📦 Tech Stack

- **Framework**: Next.js 15.0.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Forms**: React Hook Form + Zod

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd pregrade-essentials
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pregrade-essentials/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page
│   ├── products/            # Product listing & details
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── blog/                # Blog pages
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/             # Header, Footer
│   ├── ui/                 # shadcn/ui components
│   ├── animations/         # Framer Motion components
│   └── AddToCartButton.tsx # Cart functionality
├── lib/                     # Utilities and data
│   ├── products.ts         # Product data
│   ├── blog-posts.ts       # Blog content
│   ├── cart-store.ts       # Cart state management
│   └── utils.ts            # Utility functions
└── public/                  # Static assets
```

## 🎨 Customization

### Updating Products

Edit `lib/products.ts` to modify product information:

```typescript
export const products: Product[] = [
  {
    id: "your-product-id",
    name: "Product Name",
    price: 99.99,
    // ... more properties
  },
];
```

### Changing Colors

Update the design system in `app/globals.css`:

```css
.dark {
  --primary: oklch(0.65 0.28 265); /* Your brand color */
  --secondary: oklch(0.68 0.24 145); /* Accent color */
}
```

### Adding Blog Posts

Edit `lib/blog-posts.ts` to add new blog content:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "post-slug",
    title: "Post Title",
    content: "Your content here",
    // ... more properties
  },
];
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. **Set up custom domain** (optional):
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain

### Environment Variables

If you add Stripe integration or other services, create a `.env.local` file:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_SECRET_KEY=your_secret_key_here
```

## 📝 Content Updates

### Placeholder Content to Replace

1. **Product Images**: Replace emoji placeholders with actual product photos
2. **Product Details**: Update specifications, features, and pricing
3. **Blog Posts**: Add real blog content in `lib/blog-posts.ts`
4. **Contact Information**: Update email, phone, and address in contact page
5. **Social Media Links**: Update footer social media URLs
6. **Logo**: Replace the text logo with your actual logo image

### Adding Real Product Images

1. Add images to `public/` folder
2. Update product data to reference images:
   ```typescript
   image: "/products/pocket-scope.jpg"
   ```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Performance Optimization

The site is already optimized with:
- Static generation for all pages
- Automatic code splitting
- Optimized font loading (Inter)
- Minimal JavaScript bundle

## 🤝 Support

For issues or questions:
- Check the Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Review shadcn/ui docs: [ui.shadcn.com](https://ui.shadcn.com)
- Check Tailwind CSS v4: [tailwindcss.com](https://tailwindcss.com)

## 📄 License

This project is built for PreGrade Essentials. All rights reserved.

---

**Built with** ❤️ **using Next.js 15, TypeScript, and Tailwind CSS**
