"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/partnergpt",
    icon: Instagram,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/partnergpt",
    icon: Twitter,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/partnergpt",
    icon: Facebook,
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container py-10 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-base font-semibold">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter subscription */}
        <div className="border-t border-border/40 py-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-md space-y-2">
            <h4 className="text-base font-semibold">Stay updated</h4>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest updates and features.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 text-sm rounded-md border border-input bg-background w-full md:w-64"
              aria-label="Email for newsletter"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PartnerGPT. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
