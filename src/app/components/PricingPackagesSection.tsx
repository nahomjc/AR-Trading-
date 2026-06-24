"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  IconCheck,
  IconShield,
  IconTrophy,
  IconRocket,
  IconArrowRight,
} from "@tabler/icons-react";

export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  amount?: number;
  period?: string;
  savingsLabel?: string;
  features: string[];
  highlighted?: boolean;
  soldOut?: boolean;
  monthlyAmount?: number;
};

type PricingPackagesSectionProps = {
  packages: PricingPackage[];
  onGetStarted: (pkg: PricingPackage) => void;
  title?: string;
  subtitle?: string;
  showBillingToggle?: boolean;
};

const cardIcons = [IconTrophy, IconShield, IconRocket] as const;

function parseBirrAmount(price: string): number | undefined {
  const match = price.replace(/,/g, "").match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : undefined;
}

function extractPeriod(price: string): string {
  if (/\/month/i.test(price)) return "PER MONTH";
  if (/\/day/i.test(price)) return "PER DAY";
  if (/\/session/i.test(price)) return "PER SESSION";
  if (/\/campaign/i.test(price)) return "PER CAMPAIGN";
  if (/year/i.test(price)) return "PER YEAR";
  return "PER PROJECT";
}

export function offeringsToPackages(
  offerings: Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
  }>,
): PricingPackage[] {
  return offerings.map((item, index) => {
    const amount = parseBirrAmount(item.price);
    const isMonthly = /\/month/i.test(item.price);

    return {
      id: `offering-${index}`,
      name: item.name.toUpperCase(),
      price: item.price,
      amount,
      monthlyAmount: isMonthly ? amount : undefined,
      period: extractPeriod(item.price),
      features: item.features,
      highlighted: index === 1,
      soldOut: false,
    };
  });
}

export function tierPricingToPackages(
  pricing: Record<
    string,
    { name: string; price: string; features: string[] }
  >,
): PricingPackage[] {
  const order = ["basic", "professional", "enterprise"];
  const entries = order
    .filter((key) => pricing[key])
    .map((key) => ({ key, ...pricing[key] }));

  return entries.map((tier) => {
    const amount = parseBirrAmount(tier.price);
    return {
      id: tier.key,
      name: tier.name.toUpperCase(),
      price: tier.price,
      amount,
      period: "PER PROGRAM",
      features: tier.features,
      highlighted: tier.key === "professional",
      soldOut: false,
      savingsLabel:
        tier.key === "professional"
          ? "MOST POPULAR CHOICE"
          : tier.key === "enterprise"
            ? "FULL TEAM TRANSFORMATION"
            : undefined,
    };
  });
}

function formatBirr(amount: number, suffix = ""): string {
  return `${amount.toLocaleString("en-ET")} Birr${suffix}`;
}

export default function PricingPackagesSection({
  packages,
  onGetStarted,
  title = "Choose Your Path To Success",
  subtitle = "Select the package that fits your goals. Transparent pricing in Ethiopian Birr with no hidden fees.",
  showBillingToggle = true,
}: PricingPackagesSectionProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const hasMonthly = packages.some((p) => p.monthlyAmount != null);

  const displayPackages = useMemo(() => {
    if (!hasMonthly || billing === "monthly") return packages;

    return packages.map((pkg) => {
      if (!pkg.monthlyAmount) return pkg;
      const yearlyTotal = Math.round(pkg.monthlyAmount * 12 * 0.83);
      const fullYear = pkg.monthlyAmount * 12;
      const saved = fullYear - yearlyTotal;
      return {
        ...pkg,
        amount: yearlyTotal,
        price: formatBirr(yearlyTotal),
        period: "PER YEAR",
        savingsLabel: `SAVING ${saved.toLocaleString("en-ET")} BIRR YEARLY`,
      };
    });
  }, [packages, billing, hasMonthly]);

  return (
    <section className="mb-20">
      <div className="mb-10 text-center sm:mb-12">
        <motion.span
          className="mb-5 inline-block rounded-full border border-[#C79D6D]/30 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C79D6D] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Pricing
        </motion.span>

        <motion.h2
          className="text-3xl font-bold sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Choose Your Path{" "}
          </span>
          <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
            To Success
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>

        {showBillingToggle && hasMonthly && (
          <motion.div
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-[#08243A] text-white shadow-inner"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                billing === "yearly"
                  ? "bg-gradient-to-r from-[#C79D6D] to-[#d4a574] text-white shadow-md shadow-[#C79D6D]/25"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Yearly{" "}
              <span className={billing === "yearly" ? "text-white/85" : ""}>
                (17% off)
              </span>
            </button>
          </motion.div>
        )}
      </div>

      <div
        className={`mx-auto grid max-w-6xl gap-6 sm:gap-7 ${
          displayPackages.length <= 2
            ? "md:grid-cols-2"
            : displayPackages.length === 4
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {displayPackages.map((pkg, index) => {
          const Icon = cardIcons[index % cardIcons.length];
          const isFeatured = pkg.highlighted;
          const displayPrice =
            pkg.amount != null
              ? pkg.amount.toLocaleString("en-ET")
              : pkg.price
                  .replace(/^Starting from\s*/i, "")
                  .replace(/\s*\/\s*\w+$/i, "")
                  .trim();

          return (
            <motion.article
              key={pkg.id}
              className={`pricing-package-card group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 sm:rounded-3xl ${
                isFeatured
                  ? "pricing-package-card--featured border-[#C79D6D]/45 shadow-lg shadow-[#C79D6D]/10"
                  : "border-white/15 hover:border-[#C79D6D]/25 hover:shadow-lg hover:shadow-black/20"
              } ${pkg.soldOut ? "opacity-80" : ""}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {isFeatured && (
                <div className="absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent" />
              )}

              {pkg.soldOut && (
                <div className="absolute right-0 top-0 z-20 origin-top-right" aria-hidden>
                  <div className="translate-x-4 translate-y-3 rotate-45 bg-red-600/90 px-10 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Sold Out
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
                    isFeatured
                      ? "border-[#C79D6D]/40 bg-gradient-to-br from-[#C79D6D]/25 to-[#d4a574]/10 text-[#C79D6D]"
                      : "border-white/15 bg-white/[0.06] text-gray-300 group-hover:border-[#C79D6D]/30 group-hover:text-[#C79D6D]"
                  }`}
                >
                  <Icon className="h-6 w-6" stroke={1.5} />
                </div>

                <p
                  className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${
                    isFeatured ? "text-[#C79D6D]" : "text-gray-300"
                  }`}
                >
                  {pkg.name}
                </p>

                <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                  {isFeatured ? (
                    <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                      {displayPrice.replace(/\s*Birr$/i, "")}
                    </span>
                  ) : (
                    <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {displayPrice.replace(/\s*Birr$/i, "")}
                    </span>
                  )}
                  <span className="text-base font-medium text-gray-400">Birr</span>
                </div>

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {pkg.period ?? "PER PROJECT"}
                </p>

                {pkg.savingsLabel ? (
                  <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-[#C79D6D]/90">
                    {pkg.savingsLabel}
                  </p>
                ) : (
                  <div className="mb-5 h-4" />
                )}

                <ul className="mb-8 flex-1 space-y-3 border-t border-white/10 pt-5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C79D6D]/30 bg-[#C79D6D]/10">
                        <IconCheck className="h-3 w-3 text-[#C79D6D]" stroke={2.5} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={pkg.soldOut}
                  onClick={() => !pkg.soldOut && onGetStarted(pkg)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                    pkg.soldOut
                      ? "cursor-not-allowed border border-red-500/40 text-red-400"
                      : isFeatured
                        ? "btn-professional-primary text-white"
                        : "border border-[#C79D6D]/30 bg-white/[0.04] text-white hover:border-[#C79D6D]/50 hover:bg-[#C79D6D]/10"
                  }`}
                >
                  {pkg.soldOut ? "Sold Out" : "Get Started"}
                  {!pkg.soldOut && (
                    <IconArrowRight className="h-4 w-4 opacity-90" />
                  )}
                </button>
              </div>

              <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C79D6D]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-4 sm:left-4 sm:h-6 sm:w-6" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C79D6D]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:h-6 sm:w-6" />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
