"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { services, siteConfig } from "@/lib/seo";
import { scrollToSectionId } from "./LazyMount";

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Work", href: "#latest-works" },
  { label: "All Services", href: "/services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

const serviceAreas = siteConfig.serviceAreas.slice(0, 6);

function FooterLink({
  href,
  children,
  className = "text-sm text-gray-300 transition-colors hover:text-[#C79D6D]",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isHash = href.startsWith("#");

  if (isHash) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          scrollToSectionId(href.slice(1));
        }}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">
        {title}
      </h4>
      {children}
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    scrollToSectionId("contact");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md shrink-0 space-y-3"
    >
      <div className="flex items-center gap-2 rounded-full border border-[#C79D6D]/30 bg-white/5 p-1.5 pl-4 backdrop-blur-sm transition-colors focus-within:border-[#C79D6D]/60 focus-within:shadow-[0_0_20px_rgba(199,157,109,0.15)]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
          aria-label="Email for updates"
        />
        <button
          type="submit"
          disabled={!agreed}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C79D6D] to-[#d4a574] text-[#08243A] transition-all hover:shadow-[0_0_16px_rgba(199,157,109,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Subscribe"
        >
          <IconArrowRight className="h-4 w-4" stroke={2.5} />
        </button>
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-gray-400">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#C79D6D]/40 bg-transparent accent-[#C79D6D]"
        />
        <span>
          I agree to the{" "}
          <FooterLink
            href="#contact"
            className="text-xs text-gray-400 underline-offset-2 transition-colors hover:text-[#C79D6D] hover:underline"
          >
            privacy policy
          </FooterLink>
        </span>
      </label>
    </form>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();
  const servicesMid = Math.ceil(services.length / 2);
  const servicesLeft = services.slice(0, servicesMid);
  const servicesRight = services.slice(servicesMid);

  return (
    <motion.footer
      className="relative overflow-x-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#C79D6D]/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C79D6D]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 pt-16 pb-12 lg:flex-row lg:items-center">
          <p className="max-w-lg text-sm leading-relaxed text-gray-300">
            {siteConfig.shortDescription}
          </p>
          <NewsletterForm />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C79D6D]/30 to-transparent" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 lg:gap-x-12">
          <FooterColumn title="Company">
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Services">
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              <ul className="space-y-2.5">
                {servicesLeft.map((service) => (
                  <li key={service.slug}>
                    <FooterLink href={`/services/${service.slug}`}>
                      {service.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <ul className="mt-2.5 space-y-2.5 sm:mt-0">
                {servicesRight.map((service) => (
                  <li key={service.slug}>
                    <FooterLink href={`/services/${service.slug}`}>
                      {service.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </FooterColumn>

          <FooterColumn title="Service Areas">
            <ul className="space-y-2.5">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <span className="text-sm text-gray-300">{area}</span>
                </li>
              ))}
              <li>
                <FooterLink href="#contact">Nationwide</FooterLink>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Connect">
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#C79D6D]"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#C79D6D]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 transition-colors hover:text-[#C79D6D]"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 transition-colors hover:text-[#C79D6D]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 transition-colors hover:text-[#C79D6D]"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-gray-400 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">
            <FooterLink
              href="#contact"
              className="text-xs text-gray-400 transition-colors hover:text-[#C79D6D]"
            >
              Terms
            </FooterLink>
            <span className="text-gray-600" aria-hidden="true">
              ·
            </span>
            <FooterLink
              href="#contact"
              className="text-xs text-gray-400 transition-colors hover:text-[#C79D6D]"
            >
              Privacy Policy
            </FooterLink>
            <span className="text-gray-600" aria-hidden="true">
              ·
            </span>
            <FooterLink
              href="#contact"
              className="text-xs text-gray-400 transition-colors hover:text-[#C79D6D]"
            >
              Contact
            </FooterLink>
          </div>
          <p className="text-center text-gray-400">
            © {siteConfig.name} {year}
          </p>
          <p className="text-center text-gray-400 sm:text-right">
            All rights reserved
          </p>
        </div>
      </div>

      <div className="footer-brand-stage" aria-hidden="true">
        <p className="footer-brand-watermark font-outfit">addis reality</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
