"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconX,
  IconArrowRight,
  IconUsers,
} from "@tabler/icons-react";

const socialLinks = [
  {
    icon: IconBrandFacebook,
    href: "https://www.facebook.com/profile.php?id=61584982463040",
    label: "Facebook",
    handle: "Addis Reality",
    iconBg: "bg-blue-500/15 text-blue-400 group-hover:bg-blue-500/25",
    borderHover: "group-hover:border-blue-500/30",
  },
  {
    icon: IconBrandInstagram,
    href: "https://www.instagram.com/addis_reality?igsh=NXVqYXhzbm1xZ2M1",
    label: "Instagram",
    handle: "@addis_reality",
    iconBg:
      "bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-orange-500/20 text-pink-400 group-hover:from-pink-500/30 group-hover:via-purple-500/25 group-hover:to-orange-500/30",
    borderHover: "group-hover:border-pink-500/30",
  },
  {
    icon: IconBrandTiktok,
    href: "https://www.tiktok.com/@ar_solutions?_r=1&_t=ZM-91beinQ70uq",
    label: "TikTok",
    handle: "@ar_solutions",
    iconBg: "bg-white/10 text-white group-hover:bg-white/15",
    borderHover: "group-hover:border-white/25",
  },
];

const SocialMediaModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("ar-social-modal-shown");
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 60_000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (dontShowAgain) {
      localStorage.setItem("ar-social-modal-shown", "true");
    }
  }, [dontShowAgain]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handleClose]);

  if (!portalReady) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#08243A]/35 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/70 to-transparent" />

            {/* Header */}
            <div className="relative overflow-hidden px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#C79D6D]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/10 p-2">
                    <Image
                      src="/img/White-with-background-removebg-preview.png"
                      alt="ADDIS REALITY"
                      width={48}
                      height={48}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <IconUsers className="h-4 w-4 text-[#C79D6D]" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C79D6D] sm:text-xs">
                        Community
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                      Join Our Community
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Stay connected with{" "}
                      <span className="font-semibold text-[#C79D6D]">
                        ADDIS REALITY
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-white transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D]"
                  aria-label="Close"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 px-5 pb-6 sm:px-6 sm:pb-6">
              <p className="mb-5 text-center text-sm leading-relaxed text-gray-300 sm:text-base">
                Get the latest updates, creative insights, and exclusive
                content. Follow us and grow with Ethiopia&apos;s leading creative
                agency.
              </p>

              {/* Social links */}
              <div className="mb-5 space-y-2.5">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:bg-white/[0.07] sm:p-4 ${social.borderHover}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${social.iconBg}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white">
                          {social.label}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {social.handle}
                        </p>
                      </div>
                      <IconArrowRight className="h-4 w-4 shrink-0 text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-[#C79D6D]" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Don't show again */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/5 accent-[#C79D6D]"
                />
                <span className="text-sm text-gray-400 select-none">
                  Don&apos;t show this again
                </span>
              </label>

              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-white/20 hover:text-white"
              >
                Maybe later
              </button>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C79D6D]/20 sm:h-6 sm:w-6" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C79D6D]/20 sm:h-6 sm:w-6" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SocialMediaModal;
