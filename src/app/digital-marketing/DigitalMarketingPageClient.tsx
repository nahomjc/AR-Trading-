"use client";

import Footer from "../components/Footer";
import DigitalMarketingPageContent from "./DigitalMarketingPageContent";
import DigitalMarketingDock from "./DigitalMarketingDock";
import { ChatBotProvider } from "../components/ChatBot";

export default function DigitalMarketingPageClient() {
  return (
    <ChatBotProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#08243A] pb-[6.5rem] sm:pb-32">
        <div
          className="pointer-events-none absolute inset-0 galaxy-bg opacity-50"
          aria-hidden
        />
        <main className="relative z-10">
          <DigitalMarketingPageContent />
        </main>
        <Footer />
      </div>
      <DigitalMarketingDock />
    </ChatBotProvider>
  );
}
