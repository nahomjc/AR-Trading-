"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconPhone, IconPhoneOff, IconX } from "@tabler/icons-react";
import { siteConfig } from "@/lib/seo";

type PhoneCallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PhoneCallModal({ isOpen, onClose }: PhoneCallModalProps) {
  const phoneHref = `tel:${siteConfig.contact.phone}`;
  const phoneLabel = siteConfig.contact.phoneDisplay;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handleClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#08243A]/45 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-[#C79D6D]/30 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-call-title"
          >
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/70 to-transparent" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-white transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D]"
              aria-label="Close"
            >
              <IconX className="h-4 w-4" />
            </button>

            <div className="px-6 pb-8 pt-10 text-center">
              <div className="pointer-events-none absolute -left-10 top-8 h-32 w-32 rounded-full bg-[#34C759]/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-[#C79D6D]/10 blur-3xl" />

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
                className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[#C79D6D]/25 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/10 p-3 shadow-[0_0_40px_rgba(199,157,109,0.2)]"
              >
                <Image
                  src="/img/White-with-background-removebg-preview.png"
                  alt="Addis Reality"
                  width={72}
                  height={72}
                  className="h-auto w-full object-contain"
                />
              </motion.div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D]">
                Incoming call
              </p>
              <h3
                id="phone-call-title"
                className="mb-1 text-2xl font-bold text-white"
              >
                {siteConfig.name}
              </h3>
              <p className="mb-8 text-sm text-gray-400">
                Tap call to speak with our team
              </p>

              <p className="mb-6 font-mono text-lg tracking-wide text-white/90">
                {phoneLabel}
              </p>

              <div className="flex items-center justify-center gap-8">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/90 text-white shadow-lg transition-transform hover:scale-105">
                    <IconPhoneOff className="h-6 w-6" />
                  </span>
                  <span className="text-xs text-gray-400">Decline</span>
                </button>

                <a
                  href={phoneHref}
                  className="flex flex-col items-center gap-2"
                  onClick={handleClose}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#34C759] text-white shadow-[0_0_30px_rgba(52,199,89,0.45)] transition-transform hover:scale-105">
                    <IconPhone className="h-7 w-7" />
                  </span>
                  <span className="text-xs font-medium text-[#34C759]">
                    Call
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
