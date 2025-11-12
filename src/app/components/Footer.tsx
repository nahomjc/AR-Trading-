"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
                width={190}
                height={70}
                className="h-20 w-auto"
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
              {[
                "Home",
                "Services",
                "About",
                "Team",
                "Testimonials",
                "Contact",
              ].map((link, index) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
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
                "E-commerce",
              ].map((service, index) => (
                <motion.li key={service} whileHover={{ x: 5 }}>
                  <span className="text-gray-300">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} AR Solutions. All rights reserved.
            Built with innovation and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
