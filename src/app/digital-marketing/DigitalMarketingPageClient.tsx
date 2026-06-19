"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

type DigitalMarketingPageClientProps = {
  children: React.ReactNode;
};

export default function DigitalMarketingPageClient({
  children,
}: DigitalMarketingPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <main className="relative z-10 pt-24">{children}</main>
      <Footer />
    </div>
  );
}
