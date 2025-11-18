/**
 * Check Stripe Products Script
 *
 * This script connects to your Stripe account and lists all products
 * Run: node scripts/check-stripe-products.js
 */

const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envLines = envFile.split('\n');
envLines.forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    process.env[key] = value;
  }
});

async function checkStripeProducts() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error('❌ STRIPE_SECRET_KEY not found in .env.local');
    process.exit(1);
  }

  const stripe = new Stripe(secretKey);

  try {
    console.log('🔍 Checking Stripe account for products...\n');

    // List all products
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    });

    console.log(`✅ Found ${products.data.length} active product(s):\n`);

    for (const product of products.data) {
      console.log(`📦 Product: ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Description: ${product.description || 'No description'}`);
      console.log(`   Active: ${product.active}`);

      // Get prices for this product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      if (prices.data.length > 0) {
        console.log(`   Prices:`);
        prices.data.forEach(price => {
          const amount = price.unit_amount / 100;
          console.log(`      - $${amount.toFixed(2)} ${price.currency.toUpperCase()} (${price.type})`);
          console.log(`        Price ID: ${price.id}`);
        });
      } else {
        console.log(`   ⚠️  No active prices found for this product`);
      }
      console.log('');
    }

    if (products.data.length === 0) {
      console.log('⚠️  No products found in your Stripe account.');
      console.log('\n📝 Next steps:');
      console.log('   1. Go to https://dashboard.stripe.com/test/products');
      console.log('   2. Click "+ Add product"');
      console.log('   3. Create "The Pocket Scope" with price');
      console.log('   4. Run this script again');
    }

  } catch (error) {
    console.error('❌ Error fetching Stripe products:', error.message);
    if (error.type === 'StripeAuthenticationError') {
      console.error('   Check your STRIPE_SECRET_KEY in .env.local');
    }
  }
}

checkStripeProducts();
