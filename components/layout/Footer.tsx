import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  products: [
    { name: "The Pocket Scope", href: "/products/pocket-scope" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PreGrade Essentials"
                width={2880}
                height={440}
                className="h-24 w-auto md:h-28"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional card grading tools for collectors and dealers.
              Precision you can trust.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PreGrade Essentials. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
