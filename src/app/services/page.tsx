"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Navigation from "../components/Navigation";
import {
  IconPrinter,
  IconChartLine,
  IconPalette,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconBook,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

const services = [
  {
    title: "Advertising & Printing",
    description:
      "Transform your brand visibility with comprehensive advertising and printing services. From eye-catching banners to professional vehicle branding.",
    icon: IconPrinter,
    color: "from-orange-500/20 via-red-500/20 to-orange-500/20",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    hoverBorderColor: "hover:border-orange-500/60",
    slug: "advertising-printing",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    features: [
      "Banner Design & Printing",
      "Vehicle Branding",
      "Office Branding",
      "Merchandise",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your online presence and drive results with data-driven marketing solutions. From social media management to advanced SEO strategies.",
    icon: IconChartLine,
    color: "from-blue-500/20 via-purple-500/20 to-blue-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    hoverBorderColor: "hover:border-blue-500/60",
    slug: "digital-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    features: [
      "Social Media Management",
      "Paid Advertising",
      "SEO Strategy",
      "Influencer Marketing",
    ],
  },
  {
    title: "Branding & Design",
    description:
      "Create a powerful brand identity that resonates with your audience. Memorable logos, comprehensive brand guidelines, and visual strategies.",
    icon: IconPalette,
    color: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    hoverBorderColor: "hover:border-pink-500/60",
    slug: "branding-design",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80",
    features: [
      "Logo Design",
      "Brand Identity",
      "Visual Strategy",
      "Creative Content",
    ],
  },
  {
    title: "Media Production",
    description:
      "Bring your stories to life with professional media production services. From corporate videos to product photography that engages audiences.",
    icon: IconVideo,
    color: "from-green-500/20 via-teal-500/20 to-green-500/20",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
    hoverBorderColor: "hover:border-green-500/60",
    slug: "media-production",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    features: [
      "Videography",
      "Photography",
      "Promotional Content",
      "Video Editing",
    ],
  },
  {
    title: "Web Development",
    description:
      "Build a powerful online presence with comprehensive web development services. Custom websites and e-commerce solutions that drive business growth.",
    icon: IconWorld,
    color: "from-cyan-500/20 via-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    hoverBorderColor: "hover:border-cyan-500/60",
    slug: "web-development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    features: [
      "Website Design & Development",
      "Maintenance",
      "SEO Optimization",
    ],
  },
  {
    title: "Event Planning",
    description:
      "Create memorable experiences with professional event planning services. From intimate corporate gatherings to large-scale conferences.",
    icon: IconCalendarEvent,
    color: "from-purple-500/20 via-pink-500/20 to-purple-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    hoverBorderColor: "hover:border-purple-500/60",
    slug: "event-planning",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    features: [
      "Corporate Events",
      "Conferences",
      "Product Launches",
      "Team Building",
    ],
  },
  {
    title: "Training & Development",
    description:
      "Empower your team with comprehensive training programs designed to enhance skills, boost productivity, and drive organizational success.",
    icon: IconBook,
    color: "from-indigo-500/20 via-purple-500/20 to-indigo-500/20",
    iconColor: "text-indigo-400",
    borderColor: "border-indigo-500/30",
    hoverBorderColor: "hover:border-indigo-500/60",
    slug: "training-development",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    features: [
      "Corporate Training",
      "Personal Development",
      "Media Training",
      "Workshops",
    ],
  },
];

export default function ServicesPage() {
  const router = useRouter();

  // SEO Structured Data for Services Page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Marketing, Advertising, Branding, Web Development, Trading Solutions",
    provider: {
      "@type": "Organization",
      name: "AR Solutions PLC",
      url: "https://www.ar-solutions-plc.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    description:
      "AR Solutions PLC provides comprehensive digital marketing, advertising, branding, web development, media production, event planning, training, and AR Solution Trading services.",
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services - AR Solutions PLC",
    description:
      "Browse our comprehensive range of services including digital marketing, advertising, branding, web development, and AR Solution Trading.",
    url: "https://www.ar-solutions-plc.com/services",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `https://www.ar-solutions-plc.com/services/${service.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
            alt="Services background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08243A]/95 via-[#0a2a42]/90 to-[#08243A]/95"></div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <IconPalette className="w-10 h-10 text-[#C79D6D]" />
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our <span className="text-[#C79D6D]">Services</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions to elevate your brand and drive business
              success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  className="group relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => router.push(`/services/${service.slug}`)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#08243A]/80 via-[#08243A]/70 to-[#08243A]/90"></div>
                  </div>

                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Border Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 ${service.borderColor} ${service.hoverBorderColor} transition-all duration-500 opacity-0 group-hover:opacity-100`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 p-8">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${service.iconColor}`}
                      />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#C79D6D] transition-colors duration-300">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-400"
                        >
                          <IconCheck className="w-4 h-4 text-[#C79D6D] mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.div
                      className="flex items-center text-[#C79D6D] font-semibold group-hover:text-[#d4a574] transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <IconArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -top-32 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center bg-gradient-to-br from-[#C79D6D]/10 via-[#d4a574]/10 to-[#C79D6D]/10 border border-[#C79D6D]/30 rounded-3xl p-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business
              and achieve your goals.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg shadow-[#C79D6D]/25"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(199, 157, 109, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/#contact")}
            >
              Contact Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

