"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";

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
                alt="AR Solutions Logo"
                width={150}
                height={60}
                className="h-28 w-auto"
                priority
              />
            </motion.div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming businesses through innovative digital marketing
              solutions. Your success is our mission.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Testimonials", "Contact"].map(
                (link, index) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Digital Strategy",
                "Brand Development",
                "SEO & Analytics",
                "Social Media",
                "Content Marketing",
                "Web Development",
              ].map((service, index) => (
                <motion.li key={service} whileHover={{ x: 5 }}>
                  <span className="text-gray-300">{service}</span>
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
                href: "https://www.facebook.com/profile.php?id=61584322344315",
                label: "Facebook",
              },
              {
                icon: IconBrandInstagram,
                href: "https://www.instagram.com/ar_solutions1?igsh=dnJ4OXRicTVieG44",
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
            © {new Date().getFullYear()} AR Solutions. All rights reserved.
            Built with innovation and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
