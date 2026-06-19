"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import { services, siteConfig } from "@/lib/seo";

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      className="py-12 px-4 sm:px-6 lg:px-8 glass"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <motion.div className="mb-4" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/White-with-background-removebg-preview.png"
                alt={`${siteConfig.name} — #1 digital marketing agency in Ethiopia, Addis Ababa`}
                width={150}
                height={60}
                className="h-28 w-auto"
              />
            </motion.div>
            <p className="text-gray-300 mb-4 max-w-md">
              {siteConfig.name} (AR Solutions PLC) — Ethiopia&apos;s leading
              digital marketing, branding, and advertising agency in Addis Ababa.
            </p>
            <address className="not-italic text-gray-400 text-sm space-y-1 mb-4">
              <p>{siteConfig.contact.fullAddress}</p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-[#C79D6D] transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "Services", href: "/services" },
                { label: "About", href: "#about" },
                { label: "FAQ", href: "#faq" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <motion.li key={service.slug} whileHover={{ x: 5 }}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-4">
            {[
              {
                icon: IconBrandFacebook,
                href: "https://www.facebook.com/profile.php?id=61584982463040",
                label: "Facebook",
              },
              {
                icon: IconBrandInstagram,
                href: "https://www.instagram.com/addis_reality?igsh=NXVqYXhzbm1xZ2M1",
                label: "Instagram",
              },
              {
                icon: IconBrandTiktok,
                href: "https://www.tiktok.com/@ar_solutions?_r=1&_t=ZM-91beinQ70uq",
                label: "TikTok",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/40 rounded-full flex items-center justify-center text-[#C79D6D] hover:bg-gradient-to-br hover:from-[#C79D6D]/30 hover:to-[#d4a574]/30 transition-all duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <p className="text-gray-300 text-center">
            © {new Date().getFullYear()} ADDIS REALITY. All rights reserved.
            Built with innovation and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
