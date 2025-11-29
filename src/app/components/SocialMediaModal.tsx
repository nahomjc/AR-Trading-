"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconX,
  IconHeart,
  IconRocket,
} from "@tabler/icons-react";

const SocialMediaModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const hasSeenModal = localStorage.getItem("ar-social-modal-shown");
    
    if (!hasSeenModal) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    
    if (dontShowAgain) {
      localStorage.setItem("ar-social-modal-shown", "true");
    }
  };

  const socialLinks = [
    {
      icon: IconBrandFacebook,
      href: "https://www.facebook.com/profile.php?id=61584322344315",
      label: "Facebook",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      icon: IconBrandInstagram,
      href: "https://www.instagram.com/ar_solutions1?igsh=dnJ4OXRicTVieG44",
      label: "Instagram",
      color: "from-pink-500 via-purple-500 to-orange-500",
      hoverColor: "hover:from-pink-600 hover:via-purple-600 hover:to-orange-600",
    },
    {
      icon: IconBrandTiktok,
      href: "https://www.tiktok.com/@ar_solutions?_r=1&_t=ZM-91beinQ70uq",
      label: "TikTok",
      color: "from-black to-gray-800",
      hoverColor: "hover:from-gray-800 hover:to-gray-900",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            data-modal-content
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] border border-[#C79D6D]/30 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden backdrop-blur-xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Header */}
            <div className="relative px-6 py-8 border-b border-white/10 bg-gradient-to-r from-[#C79D6D]/10 via-[#C79D6D]/5 to-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C79D6D]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C79D6D] to-[#d4a574] flex items-center justify-center shadow-lg shadow-[#C79D6D]/50"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <IconRocket className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-outfit">
                      Join Our Community
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Stay connected with AR Solutions
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:text-[#C79D6D] transition-all duration-300 border border-white/10 hover:border-[#C79D6D]/40"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconX className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Message */}
              <div className="text-center space-y-2">
                <motion.div
                  className="inline-flex items-center gap-2 text-[#C79D6D] mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <IconHeart className="w-5 h-5" />
                  <span className="text-sm font-semibold">Follow Us</span>
                </motion.div>
                <p className="text-gray-300 leading-relaxed">
                  Get the latest updates, tips, and exclusive content by following
                  us on social media. Join thousands of businesses growing with AR
                  Solutions!
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${social.color} ${social.hoverColor} text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold">{social.label}</p>
                        <p className="text-sm text-white/80">
                          Follow us on {social.label}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="text-2xl">→</span>
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Don't Show Again Checkbox */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <input
                  type="checkbox"
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#C79D6D] focus:ring-2 focus:ring-[#C79D6D]/50 cursor-pointer"
                />
                <label
                  htmlFor="dont-show-again"
                  className="text-sm text-gray-400 cursor-pointer select-none"
                >
                  Don't show this again
                </label>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialMediaModal;

