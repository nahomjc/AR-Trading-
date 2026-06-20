import Image from "next/image";
import { siteConfig } from "@/lib/seo";

const TEAM_IMAGE = "/img/ar-image/DSC03209.jpg";

export function TeamPhotoSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="mb-6 inline-block rounded-full border border-[#C69c6c]/30 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 px-4 py-2 text-sm font-medium text-[#C69c6c] backdrop-blur-sm">
            Our Team
          </span>
          <h2
            id="team-heading"
            className="font-outfit text-3xl font-bold text-[#C79D6D] sm:text-4xl"
          >
            Meet the {siteConfig.name} Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            The people behind your campaigns ,working together from our Addis
            Ababa office.
          </p>
        </div>

        <figure className="group">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a2a42]/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-shadow duration-500 group-hover:shadow-[0_24px_70px_rgba(199,157,109,0.12)]">
            <Image
              src={TEAM_IMAGE}
              alt={`${siteConfig.name} team at the Addis Ababa office`}
              width={1600}
              height={1200}
              className="block h-auto w-full"
              sizes="(max-width: 896px) 100vw, 896px"
              quality={90}
            />
          </div>
          <figcaption className="mt-5 text-center text-sm text-gray-500">
            {siteConfig.name} · Addis Ababa, Ethiopia
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
