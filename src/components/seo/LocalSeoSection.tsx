import Link from "next/link";
import { services, siteConfig } from "@/lib/seo";

export function LocalSeoSection() {
  const { name, contact, serviceAreas } = siteConfig;

  return (
    <section
      id="ethiopia"
      aria-labelledby="local-seo-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            Serving All of Ethiopia
          </span>
          <h2
            id="local-seo-heading"
            className="text-3xl sm:text-4xl font-bold font-outfit text-[#C79D6D] mb-4"
          >
            Ethiopia&apos;s #1 Digital Marketing &amp; Advertising Agency
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            {name} (AR Solutions PLC) is Addis Ababa&apos;s leading full-service
            agency for{" "}
            <Link
              href="/digital-marketing"
              className="text-[#C79D6D] hover:underline"
            >
              digital marketing
            </Link>
            ,{" "}
            <Link
              href="/services/branding-design"
              className="text-[#C79D6D] hover:underline"
            >
              branding
            </Link>
            ,{" "}
            <Link
              href="/services/web-development"
              className="text-[#C79D6D] hover:underline"
            >
              web development
            </Link>
            ,{" "}
            <Link
              href="/services/advertising-printing"
              className="text-[#C79D6D] hover:underline"
            >
              advertising &amp; printing
            </Link>
            , and{" "}
            <Link
              href="/services/media-production"
              className="text-[#C79D6D] hover:underline"
            >
              media production
            </Link>
            . From our Kazanchis headquarters we help Ethiopian businesses rank
            on Google, grow on social media, and build brands that convert.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Cities We Serve
            </h3>
            <ul className="flex flex-wrap gap-2">
              {serviceAreas.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-gray-300"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact {name}
            </h3>
            <address className="not-italic text-gray-300 space-y-2 text-sm leading-relaxed">
              <p>{contact.fullAddress}</p>
              <p>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-[#C79D6D] hover:underline"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[#C79D6D] hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <nav
          aria-label="Services in Ethiopia"
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D]"
            >
              {service.title} Ethiopia
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
