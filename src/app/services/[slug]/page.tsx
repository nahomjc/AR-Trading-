"use client";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  IconPrinter,
  IconChartLine,
  IconPalette,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconBook,
  IconCheck,
  IconStar,
  IconArrowLeft,
  IconPhone,
  IconX,
  IconCopy,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";

// Mock data for each service
const serviceData = {
  "advertising-printing": {
    title: "Advertising & Printing",
    description: "Banners, stickers, office & vehicle branding, merchandise",
    icon: IconPrinter,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    features: [
      "Banner Design",
      "Vehicle Branding",
      "Office Branding",
      "Merchandise",
    ],
    detailedDescription:
      "Transform your brand visibility with our comprehensive advertising and printing services. From eye-catching banners to professional vehicle branding, we help your business stand out in the market.",
    services: [
      {
        name: "Banner Design & Printing",
        description:
          "Custom banners for events, promotions, and outdoor advertising",
        price: "Starting from $50",
        features: [
          "High-quality materials",
          "Weather-resistant",
          "Custom sizes",
          "Fast turnaround",
        ],
      },
      {
        name: "Vehicle Branding",
        description: "Complete vehicle wrap and decal solutions",
        price: "Starting from $200",
        features: [
          "Professional design",
          "Durable materials",
          "Easy installation",
          "Brand consistency",
        ],
      },
      {
        name: "Office Branding",
        description: "Interior and exterior office signage solutions",
        price: "Starting from $100",
        features: [
          "Custom design",
          "Professional installation",
          "Brand guidelines",
          "Maintenance support",
        ],
      },
      {
        name: "Merchandise Printing",
        description: "Custom printed merchandise for promotional purposes",
        price: "Starting from $25",
        features: [
          "Various products",
          "Bulk discounts",
          "Quality materials",
          "Fast delivery",
        ],
      },
    ],
    testimonials: [
      {
        name: "Alemayehu Tadesse",
        company: "EthioTech Solutions",
        rating: 5,
        comment:
          "Excellent quality banners that really made our event stand out!",
      },
      {
        name: "Meron Getachew",
        company: "Addis Delivery Services",
        rating: 5,
        comment: "Our vehicle branding increased brand recognition by 40%!",
      },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Social media management, paid ads, SEO, strategy, influencer marketing",
    icon: IconChartLine,
    color: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
    features: [
      "Social Media",
      "Paid Advertising",
      "SEO Strategy",
      "Influencer Marketing",
    ],
    detailedDescription:
      "Boost your online presence and drive results with our comprehensive digital marketing solutions. From social media management to advanced SEO strategies, we help businesses grow in the digital landscape.",
    services: [
      {
        name: "Social Media Management",
        description: "Complete social media strategy and content management",
        price: "Starting from $500/month",
        features: [
          "Content creation",
          "Community management",
          "Analytics reporting",
          "Platform optimization",
        ],
      },
      {
        name: "Paid Advertising",
        description: "Google Ads, Facebook Ads, and other paid campaigns",
        price: "Starting from $300/month",
        features: [
          "Campaign setup",
          "A/B testing",
          "Performance tracking",
          "ROI optimization",
        ],
      },
      {
        name: "SEO Strategy",
        description: "Search engine optimization for better visibility",
        price: "Starting from $400/month",
        features: [
          "Keyword research",
          "On-page optimization",
          "Link building",
          "Performance monitoring",
        ],
      },
      {
        name: "Influencer Marketing",
        description: "Connect with influencers to expand your reach",
        price: "Starting from $200/campaign",
        features: [
          "Influencer identification",
          "Campaign management",
          "Content coordination",
          "Results tracking",
        ],
      },
    ],
    testimonials: [
      {
        name: "Hirut Bekele",
        company: "Ethiopian Fashion House",
        rating: 5,
        comment:
          "Our social media engagement increased by 300% in just 3 months!",
      },
      {
        name: "Yonas Assefa",
        company: "Habesha Restaurant",
        rating: 5,
        comment: "The SEO strategy brought us 50% more organic traffic.",
      },
    ],
  },
  "branding-design": {
    title: "Branding & Design",
    description: "Logo, brand identity, strategy, visual content",
    icon: IconPalette,
    color: "from-pink-500/20 to-purple-500/20",
    iconColor: "text-pink-400",
    features: [
      "Logo Design",
      "Brand Identity",
      "Visual Strategy",
      "Creative Content",
    ],
    detailedDescription:
      "Create a powerful brand identity that resonates with your audience. Our design team crafts memorable logos, comprehensive brand guidelines, and visual strategies that set you apart from the competition.",
    services: [
      {
        name: "Logo Design",
        description: "Professional logo design with multiple concepts",
        price: "Starting from $200",
        features: [
          "Multiple concepts",
          "Unlimited revisions",
          "Vector files",
          "Brand guidelines",
        ],
      },
      {
        name: "Brand Identity",
        description: "Complete brand identity package including guidelines",
        price: "Starting from $500",
        features: [
          "Color palette",
          "Typography",
          "Brand voice",
          "Usage guidelines",
        ],
      },
      {
        name: "Visual Strategy",
        description: "Comprehensive visual strategy for brand consistency",
        price: "Starting from $300",
        features: [
          "Style guide",
          "Templates",
          "Asset library",
          "Training materials",
        ],
      },
      {
        name: "Creative Content",
        description: "Custom creative content for marketing materials",
        price: "Starting from $150",
        features: [
          "Custom graphics",
          "Social media assets",
          "Print materials",
          "Digital assets",
        ],
      },
    ],
    testimonials: [
      {
        name: "Selamawit Gebre",
        company: "Addis Startup Hub",
        rating: 5,
        comment: "The logo design perfectly captured our brand essence!",
      },
      {
        name: "Tewodros Haile",
        company: "Ethiopian Creative Agency",
        rating: 5,
        comment:
          "Professional brand identity that elevated our entire business.",
      },
    ],
  },
  "media-production": {
    title: "Media Production",
    description: "Videography, photography, promotional content",
    icon: IconVideo,
    color: "from-green-500/20 to-teal-500/20",
    iconColor: "text-green-400",
    features: [
      "Videography",
      "Photography",
      "Promotional Content",
      "Video Editing",
    ],
    detailedDescription:
      "Bring your stories to life with professional media production services. From corporate videos to product photography, we create compelling visual content that engages your audience and drives results.",
    services: [
      {
        name: "Videography",
        description: "Professional video production for various purposes",
        price: "Starting from $800/day",
        features: [
          "4K quality",
          "Professional equipment",
          "Multiple angles",
          "Post-production",
        ],
      },
      {
        name: "Photography",
        description: "High-quality photography for products and events",
        price: "Starting from $300/session",
        features: [
          "Professional lighting",
          "Multiple shots",
          "Retouching",
          "High-resolution files",
        ],
      },
      {
        name: "Promotional Content",
        description: "Engaging promotional videos and content",
        price: "Starting from $500",
        features: [
          "Script writing",
          "Storyboarding",
          "Professional editing",
          "Multiple formats",
        ],
      },
      {
        name: "Video Editing",
        description: "Professional video editing and post-production",
        price: "Starting from $200/hour",
        features: [
          "Color correction",
          "Audio enhancement",
          "Motion graphics",
          "Multiple exports",
        ],
      },
    ],
    testimonials: [
      {
        name: "Kebede Tesfaye",
        company: "EthioMart Online",
        rating: 5,
        comment: "The product videos increased our conversion rate by 60%!",
      },
      {
        name: "Marta Solomon",
        company: "Addis Corporate Events",
        rating: 5,
        comment: "Professional quality that exceeded our expectations.",
      },
    ],
  },
  "web-development": {
    title: "Web Development",
    description: "Website design, development, maintenance, SEO optimization",
    icon: IconWorld,
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    features: [
      "Website Design",
      "Development",
      "Maintenance",
      "SEO Optimization",
    ],
    detailedDescription:
      "Build a powerful online presence with our comprehensive web development services. From custom websites to e-commerce solutions, we create fast, secure, and user-friendly websites that drive business growth.",
    services: [
      {
        name: "Website Design",
        description: "Custom website design tailored to your brand",
        price: "Starting from $1,500",
        features: [
          "Responsive design",
          "User experience",
          "Brand integration",
          "Mobile optimization",
        ],
      },
      {
        name: "Development",
        description: "Full-stack web development with modern technologies",
        price: "Starting from $2,500",
        features: [
          "Custom functionality",
          "Database integration",
          "API development",
          "Performance optimization",
        ],
      },
      {
        name: "Maintenance",
        description: "Ongoing website maintenance and updates",
        price: "Starting from $200/month",
        features: [
          "Security updates",
          "Content updates",
          "Performance monitoring",
          "Backup services",
        ],
      },
      {
        name: "SEO Optimization",
        description: "Technical SEO optimization for better rankings",
        price: "Starting from $400",
        features: [
          "Site speed optimization",
          "Meta optimization",
          "Schema markup",
          "Analytics setup",
        ],
      },
    ],
    testimonials: [
      {
        name: "Aster Demissie",
        company: "Habesha Online Store",
        rating: 5,
        comment: "Our new website increased online sales by 80%!",
      },
      {
        name: "Girma Worku",
        company: "Ethiopian Service Solutions",
        rating: 5,
        comment: "Professional development with excellent ongoing support.",
      },
    ],
  },
  "event-planning": {
    title: "Event Planning",
    description:
      "Corporate events, conferences, product launches, team building",
    icon: IconCalendarEvent,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    features: [
      "Corporate Events",
      "Conferences",
      "Product Launches",
      "Team Building",
    ],
    detailedDescription:
      "Create memorable experiences with our professional event planning services. From intimate corporate gatherings to large-scale conferences, we handle every detail to ensure your event is a success.",
    services: [
      {
        name: "Corporate Events",
        description: "Professional corporate event planning and management",
        price: "Starting from $1,000",
        features: [
          "Venue selection",
          "Catering coordination",
          "Audio-visual setup",
          "Event management",
        ],
      },
      {
        name: "Conferences",
        description: "Large-scale conference planning and execution",
        price: "Starting from $2,500",
        features: [
          "Speaker coordination",
          "Registration management",
          "Technology setup",
          "On-site support",
        ],
      },
      {
        name: "Product Launches",
        description: "Exciting product launch events and campaigns",
        price: "Starting from $1,500",
        features: [
          "Event design",
          "Media coordination",
          "Guest management",
          "Follow-up campaigns",
        ],
      },
      {
        name: "Team Building",
        description: "Engaging team building activities and events",
        price: "Starting from $800",
        features: [
          "Activity planning",
          "Facilitation",
          "Materials provision",
          "Team engagement",
        ],
      },
    ],
    testimonials: [
      {
        name: "Rahel Tsegaye",
        company: "EthioTech Corporation",
        rating: 5,
        comment:
          "The conference was flawlessly executed with amazing attention to detail!",
      },
      {
        name: "Tamrat Bekele",
        company: "Addis Marketing Agency",
        rating: 5,
        comment: "Our product launch event exceeded all expectations.",
      },
    ],
  },
  training: {
    title: "Training",
    description:
      "Corporate, personal development, and media trainings (conducted in meeting rooms or offsite).",
    icon: IconBook,
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
    features: [
      "Corporate Training",
      "Personal Development",
      "Media Training",
      "Workshops",
    ],
    detailedDescription:
      "Empower your team with our comprehensive training programs designed to enhance skills, boost productivity, and drive organizational success.",
    services: [
      {
        name: "Corporate Training",
        description:
          "Tailored training programs for businesses and organizations",
        price: "Starting from $500/day",
        features: [
          "Customized curriculum",
          "Experienced trainers",
          "Interactive sessions",
          "Follow-up support",
        ],
      },
      {
        name: "Personal Development",
        description: "Individual coaching and skill development programs",
        price: "Starting from $100/session",
        features: [
          "One-on-one coaching",
          "Goal setting",
          "Progress tracking",
          "Flexible scheduling",
        ],
      },
      {
        name: "Media Training",
        description: "Professional media and communication training",
        price: "Starting from $300/session",
        features: [
          "Interview preparation",
          "Public speaking",
          "Crisis communication",
          "Media relations",
        ],
      },
    ],
    pricing: {
      basic: {
        name: "Basic Training",
        price: "$500",
        features: [
          "Half-day session",
          "Up to 10 participants",
          "Basic materials",
          "Certificate of completion",
        ],
      },
      professional: {
        name: "Professional Training",
        price: "$800",
        features: [
          "Full-day session",
          "Up to 20 participants",
          "Comprehensive materials",
          "Follow-up consultation",
          "Certificate of completion",
        ],
      },
      enterprise: {
        name: "Enterprise Training",
        price: "$1,200",
        features: [
          "Multi-day program",
          "Unlimited participants",
          "Custom curriculum",
          "Ongoing support",
          "Progress tracking",
          "Certificate of completion",
        ],
      },
    },
    testimonials: [
      {
        name: "Sara Tadesse",
        company: "Ethiopian Tech Solutions",
        rating: 5,
        comment: "The corporate training transformed our team's productivity.",
      },
      {
        name: "Mikias Haile",
        company: "Addis Marketing Solutions",
        rating: 5,
        comment:
          "Excellent media training that prepared us for major interviews.",
      },
    ],
  },
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const service = serviceData[slug as keyof typeof serviceData];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const companyPhone = "0988175550";
  const companyEmail = "artradingplc@gmail.com";

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(companyPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in your ${service?.title} services. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/251988175550?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Service Not Found
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-[#C79D6D] hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]">
      {/* Header */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center text-[#C79D6D] hover:text-[#d4a574] transition-colors duration-300"
            >
              <IconArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
          </motion.div>

          {/* Service Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 mb-6">
              <IconComponent className={`w-10 h-10 ${service.iconColor}`} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-[#C79D6D] mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {service.detailedDescription}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {service.services.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-[#C79D6D]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.name}
                </h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="text-2xl font-bold text-[#C79D6D] mb-4">
                  {item.price}
                </div>
                <ul className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <IconCheck className="w-5 h-5 text-[#C79D6D] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="w-full mt-6 bg-gradient-to-r cursor-pointer from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IconStar
                        key={i}
                        className="w-5 h-5 text-[#C79D6D] fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-[#C79D6D]">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-br from-[#C79D6D]/10 via-[#d4a574]/10 to-[#C79D6D]/10 border border-[#C79D6D]/30 rounded-2xl p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to discuss your {service.title.toLowerCase()}{" "}
              needs
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
            >
              Contact Us Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-md w-full mx-4 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] border border-[#C79D6D]/30 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Header */}
              <div className="relative h-24 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C79D6D]/10 to-[#d4a574]/10"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"></div>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                >
                  <IconX className="w-5 h-5" />
                </button>

                {/* Service Icon */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#C79D6D] to-[#d4a574] rounded-full flex items-center justify-center shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Modal Content */}
              <div className="pt-8 pb-6 px-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Get Started with {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Ready to transform your business? Contact us now!
                  </p>
                </div>

                {/* Contact Options */}
                <div className="space-y-4">
                  {/* Phone Number */}
                  <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 rounded-full flex items-center justify-center">
                          <IconPhone className="w-5 h-5 text-[#C79D6D]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Call Us</p>
                          <p className="text-[#C79D6D] font-mono text-lg">
                            {companyPhone}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={handleCopyPhone}
                        className="p-2 bg-[#C79D6D]/20 hover:bg-[#C79D6D]/30 rounded-lg transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconCopy className="w-4 h-4 text-[#C79D6D]" />
                      </motion.button>
                    </div>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-green-400 text-sm flex items-center"
                      >
                        <IconCheck className="w-4 h-4 mr-1" />
                        Phone number copied!
                      </motion.div>
                    )}
                  </div>

                  {/* Call Now Button */}
                  <motion.a
                    href={`tel:${companyPhone}`}
                    className="w-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconPhone className="w-5 h-5" />
                    <span>Call Now</span>
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconBrandWhatsapp className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </motion.button>

                  {/* Email */}
                  <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 rounded-full flex items-center justify-center">
                        <IconMail className="w-5 h-5 text-[#C79D6D]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Email Us</p>
                        <p className="text-[#C79D6D] text-sm">{companyEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-xs">
                    Available Monday - Friday, 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
