export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "All",
  "Product",
  "Shipping",
  "Returns",
  "Usage",
  "Authentication",
] as const;

export type FAQCategory = typeof faqCategories[number];

export const faqData: FAQItem[] = [
  // Product Questions
  {
    id: "prod-1",
    question: "What is The Pocket Scope?",
    answer: "The Pocket Scope is a professional-grade digital magnifier designed specifically for card authentication and defect detection. It features a 2.4\" HD IPS display with 5X-14X adjustable magnification, dual white/UV lighting, and is perfect for inspecting both raw and graded cards from any TCG including sports cards, Pokémon, Magic: The Gathering, and more.",
    category: "Product",
  },
  {
    id: "prod-2",
    question: "How does the UV light help authenticate cards?",
    answer: "The built-in UV light reveals hidden security marks and authentication features on graded PSA, BGS, and SGC slabs that are invisible under normal light. This helps you verify the authenticity of graded cards and prevent purchasing counterfeit slabs.",
    category: "Authentication",
  },
  {
    id: "prod-3",
    question: "What magnification levels are available?",
    answer: "The Pocket Scope offers three adjustable magnification levels: 5×, 9×, and 14×. These levels allow you to inspect everything from general card condition to micro-scratches, print lines, and edge wear that are invisible to the naked eye.",
    category: "Product",
  },
  {
    id: "prod-4",
    question: "Can I use it on graded cards (PSA slabs)?",
    answer: "Absolutely! The Pocket Scope is designed to work with both raw and graded cards. The UV light feature is specifically useful for authenticating PSA, BGS, and SGC slabs by revealing their security marks.",
    category: "Usage",
  },
  {
    id: "prod-5",
    question: "How long does the battery last?",
    answer: "The 500mAh rechargeable battery provides extended use for inspecting multiple cards. The device features an auto power-off function after 10 minutes of inactivity to conserve battery life. A USB charging cable is included.",
    category: "Product",
  },
  {
    id: "prod-6",
    question: "Is it portable for card shows?",
    answer: "Yes! The Pocket Scope is designed to be compact and lightweight, making it perfect for card shows, private sales, shop visits, and on-the-go inspection anywhere you need to authenticate or inspect cards.",
    category: "Product",
  },

  // Usage Questions
  {
    id: "usage-1",
    question: "How do I use The Pocket Scope?",
    answer: "Place the Pocket Scope flush against the card surface. Use the M button on the right side to power on the device and adjust magnification levels. The left side button controls the lighting (white light or UV light). The 2.4\" display will show a magnified view of the card surface.",
    category: "Usage",
  },
  {
    id: "usage-2",
    question: "Can I inspect cards before sending them to PSA/BGS?",
    answer: "Yes! This is one of the primary use cases. The Pocket Scope helps you pre-screen cards before submission to avoid wasting $20-50 grading fees on cards with hidden defects, centering issues, or surface damage that would result in lower grades.",
    category: "Usage",
  },
  {
    id: "usage-3",
    question: "What types of defects can I detect?",
    answer: "The Pocket Scope can reveal surface scratches, print lines, edge wear, corner damage, centering issues, whitening, indentations, and other micro-defects that affect card grading. The UV light also helps detect restoration attempts and counterfeit authentication.",
    category: "Usage",
  },
  {
    id: "usage-4",
    question: "Does it work with card sleeves or top loaders?",
    answer: "For best results, inspect raw cards directly without sleeves. For graded slabs (PSA, BGS, SGC), you can inspect through the case. The UV light feature works particularly well on slabs to reveal authentication marks.",
    category: "Usage",
  },

  // Shipping Questions
  {
    id: "ship-1",
    question: "How fast is shipping?",
    answer: "We offer free standard shipping on orders over $50, which typically takes 3-5 business days. Orders ship within 24 hours on business days. In-stock items marked 'Ships Today' will be dispatched the same day if ordered before 2 PM EST.",
    category: "Shipping",
  },
  {
    id: "ship-2",
    question: "Do you ship internationally?",
    answer: "Currently, we ship within the United States. International shipping will be available soon. Sign up for our email list to be notified when international shipping launches.",
    category: "Shipping",
  },
  {
    id: "ship-3",
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package's progress on the carrier's website.",
    category: "Shipping",
  },
  {
    id: "ship-4",
    question: "What if my package is lost or damaged?",
    answer: "We fully insure all shipments. If your package is lost or arrives damaged, contact us immediately at support@pregradeessentials.com with your order number and photos (if damaged). We'll send a replacement right away.",
    category: "Shipping",
  },

  // Returns Questions
  {
    id: "return-1",
    question: "What is your return policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with The Pocket Scope, return it within 30 days of delivery for a full refund. The product must be in original condition with all accessories.",
    category: "Returns",
  },
  {
    id: "return-2",
    question: "How do I initiate a return?",
    answer: "Email support@pregradeessentials.com with your order number and reason for return. We'll provide you with a return shipping label and instructions. Returns are free - we cover the shipping cost.",
    category: "Returns",
  },
  {
    id: "return-3",
    question: "How long does it take to get a refund?",
    answer: "Refunds are processed within 2-3 business days after we receive your returned item. The refund will be credited to your original payment method. Depending on your bank, it may take an additional 5-7 business days to appear in your account.",
    category: "Returns",
  },
  {
    id: "return-4",
    question: "Can I exchange for a different product?",
    answer: "Currently, we offer The Pocket Scope as our primary product. If you'd like to return your purchase and order something else in the future, please initiate a return and place a new order when ready.",
    category: "Returns",
  },

  // Authentication Questions
  {
    id: "auth-1",
    question: "Can it detect fake PSA slabs?",
    answer: "Yes! The UV light feature reveals hidden authentication marks on genuine PSA, BGS, and SGC slabs. Counterfeit slabs often lack these security features or have poorly replicated versions that are visible under UV light.",
    category: "Authentication",
  },
  {
    id: "auth-2",
    question: "How do I authenticate a graded card?",
    answer: "Turn on the UV light mode using the left side button. Shine it on the PSA/BGS/SGC label and case. Authentic slabs will display specific security features and marks that are invisible under normal light. Compare with known authentic examples.",
    category: "Authentication",
  },
  {
    id: "auth-3",
    question: "Can it detect reprint or counterfeit raw cards?",
    answer: "While The Pocket Scope can reveal printing patterns, paper quality, and surface characteristics that differ from authentic cards, it's primarily designed for defect detection and slab authentication. Always cross-reference with known authentic examples and use additional authentication methods for high-value raw cards.",
    category: "Authentication",
  },
  {
    id: "auth-4",
    question: "Does it work with all grading companies?",
    answer: "The UV authentication feature works best with PSA, BGS (Beckett), and SGC slabs as they incorporate UV-reactive security features. Other grading companies may have different authentication methods. The magnification features work universally for defect detection regardless of grading company.",
    category: "Authentication",
  },
];

export function getFAQsByCategory(category: FAQCategory): FAQItem[] {
  if (category === "All") {
    return faqData;
  }
  return faqData.filter((faq) => faq.category === category);
}

export function searchFAQs(query: string): FAQItem[] {
  const lowercaseQuery = query.toLowerCase();
  return faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery)
  );
}
