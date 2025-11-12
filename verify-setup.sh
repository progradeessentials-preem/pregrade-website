#!/bin/bash

echo "=========================================="
echo "Stripe Setup Verification"
echo "=========================================="
echo ""

# Check if .env.local exists
echo "Checking .env.local..."
if [ -f .env.local ]; then
    echo "✅ .env.local exists"
    
    # Check if secret key is still placeholder
    if grep -q "sk_test_YOUR_SECRET_KEY_HERE" .env.local; then
        echo "⚠️  WARNING: You still need to add your STRIPE_SECRET_KEY!"
        echo "   Get it from: https://dashboard.stripe.com/test/apikeys"
    else
        echo "✅ STRIPE_SECRET_KEY is configured"
    fi
else
    echo "❌ .env.local not found!"
fi

echo ""

# Check if .gitignore protects .env.local
echo "Checking .gitignore..."
if [ -f .gitignore ] && grep -q ".env.local" .gitignore; then
    echo "✅ .env.local is in .gitignore (protected from Git)"
else
    echo "❌ .gitignore doesn't protect .env.local!"
fi

echo ""

# Check Stripe packages
echo "Checking npm packages..."
if npm list stripe @stripe/stripe-js > /dev/null 2>&1; then
    echo "✅ Stripe packages installed:"
    npm list stripe @stripe/stripe-js 2>/dev/null | grep -E "(stripe|@stripe)"
else
    echo "❌ Stripe packages not installed!"
fi

echo ""

# Check file structure
echo "Checking file structure..."
files=(
    "lib/stripe.ts"
    "app/api/create-payment-intent/route.ts"
    "app/api/webhooks/stripe/route.ts"
    "components/stripe/StripeProvider.tsx"
    "components/stripe/CheckoutForm.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done

echo ""

# Check documentation
echo "Checking documentation..."
docs=(
    "STRIPE_SECURITY_GUIDE.md"
    "STRIPE_USAGE_EXAMPLE.md"
    "SETUP_COMPLETE.md"
    ".env.example"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "❌ $doc (missing)"
    fi
done

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo "1. Get your secret key from Stripe Dashboard"
echo "   https://dashboard.stripe.com/test/apikeys"
echo ""
echo "2. Update .env.local with your secret key"
echo ""
echo "3. Restart dev server: npm run dev"
echo ""
echo "4. Test the API:"
echo "   curl -X POST http://localhost:3000/api/create-payment-intent \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"amount\": 5000, \"currency\": \"usd\"}'"
echo ""
echo "5. Read SETUP_COMPLETE.md for full instructions"
echo "=========================================="
