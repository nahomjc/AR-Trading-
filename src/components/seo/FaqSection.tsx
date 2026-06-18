import { faqs, siteConfig } from "@/lib/seo";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-bold font-outfit text-[#C79D6D] mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to know about {siteConfig.name} — Ethiopia&apos;s
            trusted partner for digital marketing, branding, and business
            growth.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group glass rounded-xl border border-white/10 overflow-hidden"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-white hover:text-[#C79D6D] transition-colors flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span
                  className="text-[#C79D6D] text-xl shrink-0 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="faq-answer px-6 pb-5 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
