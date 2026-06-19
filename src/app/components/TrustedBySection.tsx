"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import HorizontalScrollRow from "./HorizontalScrollRow";

type Client = {
  id: string;
  name: string;
  logo: string;
  width: number;
  lightLogo?: boolean;
};

const clients: Client[] = [
  {
    id: "adona",
    name: "Adona Spa Lodge",
    logo: "/img/trusted-company/adona%20logo.png",
    width: 150,
  },
  {
    id: "caredent",
    name: "CareDent",
    logo: "/img/trusted-company/caredent%20logo.png",
    width: 140,
    lightLogo: true,
  },
  {
    id: "epl",
    name: "EPL Fans Association",
    logo: "/img/trusted-company/sport.png",
    width: 110,
    lightLogo: true,
  },
  {
    id: "ministry",
    name: "Ministry of Water and Energy",
    logo: "/img/trusted-company/ministry-water-energy.png",
    width: 180,
    lightLogo: true,
  },
  {
    id: "yewenet",
    name: "Yewenet",
    logo: "/img/trusted-company/yewenet%20logo.png",
    width: 130,
  },
  {
    id: "happiness",
    name: "Happiness",
    logo: "/img/client/happiness_logo.png",
    width: 140,
  },
  {
    id: "mochapia",
    name: "Mochapia Coffee",
    logo: "/img/client/image-removebg-preview.png",
    width: 150,
    lightLogo: true,
  },
  {
    id: "olfine",
    name: "OLfine",
    logo: "/img/client/Olfine-Logo-White.png",
    width: 130,
    lightLogo: true,
  },
];

type PartnerCardProps = {
  client: Client;
  onSelect: (client: Client) => void;
};

function PartnerCard({ client, onSelect }: PartnerCardProps) {
  return (
    <div className="carousel-card w-[200px] sm:w-[220px]">
      <p
        className="mb-3 truncate px-1 text-center text-xs font-medium text-gray-400"
        title={client.name}
      >
        {client.name}
      </p>
      <button
        type="button"
        onClick={() => onSelect(client)}
        className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79D6D] rounded-2xl"
      >
        <div
          className={`flex h-32 items-center justify-center rounded-2xl border p-5 transition-colors duration-300 sm:h-36 ${
            client.lightLogo
              ? "border-white/15 bg-white/[0.92] group-hover:border-[#C79D6D]/50"
              : "border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.04] group-hover:border-[#C79D6D]/40 group-hover:bg-white/[0.1]"
          }`}
        >
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={client.width}
            height={80}
            className={`max-h-[72px] w-auto object-contain sm:max-h-20 ${
              client.lightLogo ? "" : "opacity-90 group-hover:opacity-100"
            }`}
          />
        </div>
      </button>
    </div>
  );
}

const TrustedBySection = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const closeModal = useCallback(() => setSelectedClient(null), []);

  useEffect(() => {
    if (!selectedClient) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedClient, closeModal]);

  const partnerModal =
    portalReady &&
    createPortal(
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.button
              type="button"
              onClick={closeModal}
              className="fixed top-4 right-4 z-[100001] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:border-[#C79D6D]/50 hover:text-[#C79D6D] sm:top-6 sm:right-6"
              aria-label="Close"
            >
              <IconX className="h-5 w-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] p-8 text-center shadow-2xl sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent" />

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C79D6D]">
                Trusted Partner
              </p>
              <h3 className="mb-8 text-xl font-bold text-white sm:text-2xl">
                {selectedClient.name}
              </h3>

              <div
                className={`mx-auto flex max-w-sm items-center justify-center rounded-2xl border p-8 ${
                  selectedClient.lightLogo
                    ? "border-white/15 bg-white/[0.95]"
                    : "border-white/10 bg-white/[0.06]"
                }`}
              >
                <Image
                  src={selectedClient.logo}
                  alt={selectedClient.name}
                  width={selectedClient.width * 1.4}
                  height={120}
                  className="max-h-28 w-auto object-contain sm:max-h-32"
                />
              </div>

              <p className="mt-8 text-sm leading-relaxed text-gray-400">
                Proud to collaborate with {selectedClient.name} on impactful
                projects across Ethiopia.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <section className="relative overflow-x-hidden py-20 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#C79D6D]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-6 inline-flex items-center rounded-full border border-[#C79D6D]/30 bg-gradient-to-r from-[#C79D6D]/20 via-[#d4a574]/20 to-[#C79D6D]/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#C79D6D] backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="mr-3 h-2 w-2 animate-pulse rounded-full bg-[#C79D6D]" />
            Trusted Partners
            <span className="ml-3 h-2 w-2 animate-pulse rounded-full bg-[#C79D6D]" />
          </motion.div>

          <motion.h2
            className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Trusted By{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Leading brands and organizations that trust us to deliver
            exceptional results.
          </motion.p>
        </motion.div>
      </div>

      {/* Full-width infinite partner scroll */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <HorizontalScrollRow
          fullBleed
          ariaLabel="Trusted partner logos"
          minLoopItems={16}
          marqueeDuration={32}
        >
          {clients.map((client) => (
            <PartnerCard
              key={client.id}
              client={client}
              onSelect={setSelectedClient}
            />
          ))}
        </HorizontalScrollRow>
      </motion.div>

      <div className="relative z-10 mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative h-px w-32 bg-gradient-to-r from-transparent via-[#C79D6D]/50 to-transparent">
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79D6D]" />
          </div>
        </motion.div>
      </div>

      {partnerModal}
    </section>
  );
};

export default TrustedBySection;
