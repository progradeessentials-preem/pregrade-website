# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PreGrade Essentials** - E-commerce landing page for professional card authentication and grading tools, specifically "The Pocket Scope" digital magnifier with UV light for authenticating PSA slabs and detecting card defects.

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with OKLCH color space
- **State Management**: Zustand (cart persistence)
- **Payments**: Stripe integration
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

## Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Development workflow
npm install          # Install dependencies
npm run dev          # Start development
```

## Architecture & Key Patterns

### App Router Structure (Next.js 15)

```
app/
├── page.tsx                    # Homepage with hero, features, social proof
├── products/
│   ├── page.tsx               # Product listing
│   └── [id]/page.tsx          # Dynamic product detail pages
├── cart/page.tsx              # Shopping cart
├── checkout/page.tsx          # Checkout flow
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [id]/page.tsx          # Dynamic blog posts
├── api/
│   ├── create-payment-intent/route.ts  # Stripe payment creation
│   └── webhooks/stripe/route.ts        # Stripe webhook handler
├── layout.tsx                 # Root layout with metadata, schema.org
├── globals.css                # Design system tokens, animations
├── sitemap.ts                 # Dynamic sitemap generation
├── robots.ts                  # Robots.txt configuration
└── manifest.ts                # PWA manifest
```

### State Management (Zustand)

**Cart Store** (`lib/cart-store.ts`):
- Persistent cart using `zustand/middleware/persist`
- localStorage key: `"pregrade-cart"`
- Actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `getTotalItems`, `getTotalPrice`
- Usage: `const { items, addItem } = useCart()`

### Data Layer

**Products** (`lib/products.ts`):
- Product type definition with tier system (Entry/Pro/Elite)
- Single product array: `products[]`
- Helpers: `getProductById(id)`, `formatPrice(price)`
- Currently 1 product: "pocket-scope" - modify this array to add products

**Blog Posts** (`lib/blog-posts.ts`):
- BlogPost type with author, category, readTime
- Array: `blogPosts[]` with 6+ SEO-optimized posts
- Helpers: `getBlogPostById(id)`, `getBlogPostsByCategory(category)`
- Add new posts to array - no database needed

### Stripe Integration (Security-Critical)

**Configuration** (`lib/stripe.ts`):
- **Client-side**: `getStripe()` - uses `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Server-side**: `getServerStripe()` - uses `STRIPE_SECRET_KEY` (API routes only)
- **NEVER** import `getServerStripe` in client components
- Webhook verification: `verifyWebhookSignature(payload, signature)`

**Payment Flow**:
1. Client: Create payment intent via `/api/create-payment-intent`
2. Server validates amount ($0.50 - $9,999.99), creates Stripe PaymentIntent
3. Client: Checkout page uses `@stripe/react-stripe-js` components
4. Webhooks: `/api/webhooks/stripe` handles payment events

**Environment Variables Required**:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Design System (Tailwind v4)

**Color Palette** (`app/globals.css`):
- Dark theme primary: `oklch(0.65 0.28 265)` (Electric Blue)
- Secondary: `oklch(0.68 0.24 145)` (Emerald Green)
- Background: `oklch(0.08 0 0)` (Deep charcoal)
- Cards: `oklch(0.12 0 0)` (Elevated dark)

**Custom Utilities**:
- `.glass` / `.glass-strong` - Glass morphism effects
- `.text-gradient` - Blue to green gradient text
- `.border-glow` - Glowing border with primary color
- `.shimmer` - Premium shimmer animation
- `.fade-in-up` / `.scale-in` - Entry animations
- `.btn-premium` - Enhanced button with hover effects
- `.card-hover` - Lift effect on hover

**Typography System**:
- H1: `text-4xl md:text-5xl lg:text-6xl` with `-0.03em` tracking
- H2: `text-3xl md:text-4xl lg:text-5xl` with `-0.025em` tracking
- Body: `line-height: 1.7`, `-0.01em` tracking
- Lead text: `.lead-text` class for larger body copy

### SEO & Metadata

**Dynamic Sitemap** (`app/sitemap.ts`):
- Auto-generates from `products[]` array
- Static pages with priority/changeFreq
- Base URL: `https://pregradeessentials.com`
- **IMPORTANT**: Update sitemap when adding pages

**Metadata Strategy**:
- Root layout: Organization schema, OpenGraph, Twitter cards
- Per-page metadata: Each route has unique title/description
- Keywords optimized for: PSA authentication, card grading tools, TCG inspection
- Images: `/pocket-scope.png` for social sharing

**robots.txt** (`app/robots.ts`):
- Allows all crawlers
- Sitemap reference
- Max snippet/preview settings

### Component Patterns

**Layout Components** (`components/layout/`):
- `Header.tsx` - Navigation with cart badge
- `Footer.tsx` - Links, social, newsletter signup

**UI Components** (`components/ui/`):
- shadcn/ui components (button, card, dialog, form, etc.)
- Radix UI primitives
- Sonner for toast notifications

**Feature Components**:
- `AddToCartButton.tsx` - Zustand cart integration
- `EmailCapturePopup.tsx` - Lead capture modal
- `ProductCarousel.tsx` - Embla carousel for products
- `ProductImageGallery.tsx` - Image viewer with zoom
- `ProductReviews.tsx` - Reviews with rating system
- `ReviewForm.tsx` - React Hook Form + Zod validation
- `WebVitals.tsx` - Performance monitoring

### TypeScript Configuration

**Path Aliases** (`tsconfig.json`):
- `@/*` maps to root directory
- Example: `import { products } from '@/lib/products'`

**Compiler Options**:
- Strict mode enabled
- Target: ES2017
- JSX: `react-jsx` (React 19)
- Module: `esnext` with bundler resolution

## Development Guidelines

### Adding New Products

1. Edit `lib/products.ts`:
```typescript
export const products: Product[] = [
  // Add new product object
  {
    id: "unique-slug",
    name: "Product Name",
    price: 99.99,
    tier: "Pro",
    // ... other fields
  }
]
```

2. Update sitemap (automatic via `app/sitemap.ts`)
3. Add product images to `public/` directory
4. Product detail page auto-generates at `/products/{id}`

### Adding Blog Posts

1. Edit `lib/blog-posts.ts`:
```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "post-slug",
    title: "SEO-Optimized Title",
    excerpt: "150-char description",
    content: "Full markdown-style content",
    author: "Author Name",
    date: "YYYY-MM-DD",
    category: "Education|Authentication|Investing",
    readTime: "X min read",
    image: "emoji or path"
  }
]
```

2. Blog post auto-generates at `/blog/{id}`
3. Update sitemap if needed

### Adding New Pages

1. Create `app/new-page/page.tsx`
2. Add metadata export for SEO
3. Update `app/sitemap.ts` static pages array
4. Update navigation in `components/layout/Header.tsx`

### Styling Guidelines

**Use Design Tokens**:
- Colors: `bg-background`, `text-foreground`, `border-border`
- Radius: `rounded-lg` (uses `--radius` token)
- Shadows: `shadow-premium`, `shadow-glow-blue`

**Responsive Design**:
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Container padding: `container-padding` utility

**Animations**:
- Prefer utility classes: `.fade-in-up`, `.scale-in`
- Framer Motion for complex animations
- Keep animations subtle and purposeful

### Testing Checklist

Before deployment:
- [ ] `npm run build` succeeds with 0 errors
- [ ] `npm run lint` passes
- [ ] All links work (no 404s)
- [ ] Sitemap includes all pages
- [ ] Metadata present on all pages
- [ ] Stripe test mode works in checkout
- [ ] Cart persistence works (refresh page)
- [ ] Mobile responsive on all pages
- [ ] Images load correctly

## Environment Setup

**Required for development**:
1. Copy `.env.example` to `.env.local`
2. Add Stripe test keys from dashboard.stripe.com
3. Set `NEXT_PUBLIC_APP_URL=http://localhost:3000`

**Production deployment**:
- Vercel auto-detects Next.js configuration
- Add environment variables in Vercel dashboard
- Enable Stripe webhooks pointing to production URL

## Security Notes

**Stripe Integration**:
- NEVER expose `STRIPE_SECRET_KEY` to client
- API routes validate input (amount, currency)
- Payment intent creation has min/max limits
- Webhooks verify signature before processing

**Environment Variables**:
- `NEXT_PUBLIC_*` are client-safe
- Other variables are server-only
- Never commit `.env.local` to git

**Content Security**:
- No user-generated content (static data arrays)
- Form validation with Zod schemas
- Type-safe throughout with TypeScript strict mode

## Performance Optimizations

- Static generation for all pages (SSG)
- Automatic code splitting per route
- Image optimization (Next.js Image component)
- Font optimization (Inter with `display: swap`)
- Minimal JavaScript bundle
- CSS inlining for critical styles

## Key File Locations

```
lib/
├── products.ts          # Product catalog (add products here)
├── blog-posts.ts        # Blog content (add posts here)
├── cart-store.ts        # Cart state management
├── stripe.ts            # Stripe configuration
└── utils.ts             # Utility functions (cn, etc.)

components/
├── layout/              # Header, Footer
├── ui/                  # shadcn/ui components
└── *.tsx                # Feature components

app/
├── api/                 # API routes (Stripe)
├── */page.tsx           # Route pages
├── layout.tsx           # Root layout + SEO
├── globals.css          # Design system
└── sitemap.ts           # SEO sitemap
```

## Common Patterns

**Server Component (default)**:
```typescript
// app/page.tsx
export default function Page() {
  // Can fetch data, access env vars
  return <div>Content</div>
}
```

**Client Component**:
```typescript
'use client'
import { useState } from 'react'

export default function Interactive() {
  const [state, setState] = useState()
  return <button onClick={...}>Click</button>
}
```

**Dynamic Route**:
```typescript
// app/products/[id]/page.tsx
export default function ProductPage({
  params
}: {
  params: { id: string }
}) {
  const product = getProductById(params.id)
  return <div>{product.name}</div>
}
```

**API Route**:
```typescript
// app/api/*/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ data })
}
```
