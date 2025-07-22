"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollStars from "./components/ScrollStars";
import CPUAnimation from "./components/CPUAnimation";
import PoweredBySection from "./components/PoweredBySection";
import ChatBot from "./components/ChatBot";
import IntroLoader from "./components/IntroLoader";

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  const navLinks = [
    "Home",
    "Services",
    "About",
    "Team",
    "Testimonials",
    "Contact",
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold font-poppins gradient-text">
              AR Trading PLC
            </h1>
          </motion.div>
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                initial={false}
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                className="w-7 h-7 flex flex-col justify-center items-center"
              >
                <span
                  className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown */}
      <motion.div
        initial={false}
        animate={
          menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-cyan-900/80 backdrop-blur-md shadow-lg"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="px-4 pt-2 pb-4 flex flex-col space-y-2">
          {navLinks.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={handleNavClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -20 }}
              transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Animated Particle Background for Hero
const HeroParticles = () => {
  const particles = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 shadow-lg"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(1px)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, Math.random() * 16 - 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [shine, setShine] = useState(false);
  useEffect(() => {
    setShine(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative hero-pattern"
    >
      <HeroParticles />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>

      {/* CPU Animation Background */}

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-8">
            🚀 Leading Digital Marketing Solutions
          </span>
        </motion.div>

        {/* Animated Gradient Shine Headline */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold font-poppins mb-8 leading-tight relative overflow-hidden"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="gradient-text relative inline-block">
            Elevate Your Business
            {/* Shine effect */}
            <motion.span
              className="absolute left-0 top-0 h-full w-full pointer-events-none"
              animate={shine ? { x: ["-100%", "120%"] } : {}}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
                maskImage:
                  "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                mixBlendMode: "lighten",
              }}
            />
          </span>
          <br />
          <motion.span
            className="text-white inline-block"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ willChange: "transform" }}
          >
            to Digital Excellence
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          AR Trading PLC delivers cutting-edge digital marketing solutions that
          drive exponential growth, enhance brand visibility, and create lasting
          customer relationships in today&apos;s competitive digital landscape.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.a
            href="#services"
            className="btn-primary hover-lift group"
            whileHover={{ scale: 1.08, y: -5, boxShadow: "0 0 24px #06b6d4" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Our Services</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary hover-lift"
            whileHover={{ scale: 1.08, y: -5, boxShadow: "0 0 24px #a78bfa" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "150+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stats-card p-6 text-center hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "Digital Strategy & Consulting",
      description:
        "Comprehensive digital transformation strategies tailored to your business goals, market dynamics, and competitive landscape.",
      icon: "🎯",
      features: ["Market Analysis", "Strategic Planning", "Growth Roadmap"],
    },
    {
      title: "Brand Development & Identity",
      description:
        "Build powerful brand identities that resonate with your audience and differentiate your business in the marketplace.",
      icon: "🚀",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    },
    {
      title: "SEO & Digital Analytics",
      description:
        "Data-driven SEO strategies and advanced analytics to maximize your online visibility and measure ROI effectively.",
      icon: "📊",
      features: ["Keyword Research", "Technical SEO", "Performance Tracking"],
    },
    {
      title: "Social Media Marketing",
      description:
        "Engaging social media campaigns that build communities, drive meaningful interactions, and increase brand awareness.",
      icon: "📱",
      features: [
        "Content Strategy",
        "Community Management",
        "Paid Advertising",
      ],
    },
    {
      title: "Content Creation & Marketing",
      description:
        "Compelling content strategies that tell your story, engage your audience, and drive conversions across all channels.",
      icon: "✨",
      features: ["Content Strategy", "Creative Production", "Distribution"],
    },
    {
      title: "E-commerce Solutions",
      description:
        "End-to-end e-commerce platforms designed for optimal user experience, conversion optimization, and scalability.",
      icon: "🛍️",
      features: [
        "Platform Development",
        "UX/UI Design",
        "Conversion Optimization",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From strategy to execution, we provide end-to-end digital marketing
            solutions designed to elevate your business and drive sustainable
            growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="mirror-card p-8 hover-lift group"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold font-poppins mb-4 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm text-gray-400"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Who We Are Section
const WhoWeAreSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative team-bg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            Innovators. Strategists. Partners.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="mirror-card p-8 lg:p-12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-poppins mb-6 text-white">
              Building Digital Excellence Since 2019
            </h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              At AR Trading PLC, we believe in the transformative power of
              digital innovation. Since our inception, we&apos;ve been at the
              forefront of digital marketing evolution, helping businesses
              navigate the complex digital landscape with confidence and
              clarity.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Our team combines creative vision with analytical precision to
              deliver solutions that not only meet current needs but anticipate
              future opportunities. We&apos;re not just service providers;
              we&apos;re strategic partners committed to your long-term success.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  500+
                </div>
                <div className="text-gray-300 text-sm">Projects Delivered</div>
              </motion.div>
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  150+
                </div>
                <div className="text-gray-300 text-sm">Happy Clients</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mirror-card p-8 h-96 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👥</div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  Our Team at Work
                </h4>
                <p className="text-gray-300">
                  Dedicated professionals crafting digital excellence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Meet the Team Section
const TeamSection = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      description: "Strategic visionary with 10+ years in digital marketing",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "👨‍🎨",
      description: "Award-winning designer specializing in brand identity",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Strategy",
      image: "👩‍💻",
      description: "Data-driven strategist focused on measurable results",
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      image: "👨‍💻",
      description: "Full-stack developer with expertise in modern frameworks",
    },
    {
      name: "Lisa Thompson",
      role: "Content Manager",
      image: "👩‍📝",
      description: "Storyteller who crafts compelling brand narratives",
    },
    {
      name: "James Wilson",
      role: "SEO Specialist",
      image: "👨‍🔬",
      description: "Analytics expert optimizing for search excellence",
    },
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Our Team
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            Meet the Team Under the Hood
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With its existing reputation and plans to build a proprietary
            technology solution that will bring meaningful value to clients, AR
            Trading PLC is well-positioned to become one of the most trusted
            digital solution providers in the industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="mirror-card p-8 text-center hover-lift group"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
              >
                {member.image}
              </motion.div>
              <h3 className="text-xl font-semibold font-poppins mb-2 text-white">
                {member.name}
              </h3>
              <div className="text-blue-400 font-medium mb-4">
                {member.role}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mr. Melkamu Mekonnen",
      role: "Group CEO at Haile Hospitality Group",
      content:
        "It's with much enthusiasm that I am writing to recommend the service & products of AR Trading PLC. We have been using some of the services of the company in the area of Re-branding and website development and have always been completely satisfied with their performance.",
      rating: 5,
    },
    {
      name: "Mr. Bikila Hurisa",
      role: "Public & International Relations Director at Prosperity Party",
      content:
        "On behalf of our party, I am extremely delighted to recommend you the exemplary quality services of AR Trading PLC. They provide all the Rebranding solutions. The company has developed an outstanding reputation in the industry.",
      rating: 5,
    },
    {
      name: "Mr. Fisseha Asress",
      role: "Senior Consultant & Advisor at Ethiopian Airlines",
      content:
        "With well earned respect, I confidently recommend AR Trading PLC for brand strategy and guideline development, website and ERP design & development, digital marketing and other tech related services. Their team manages their portion exceptionally well.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what industry
            leaders say about our work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card p-8 hover-lift"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-blue-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section with Google Map
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Contact Us
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            Let&apos;s Start Your Digital Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your digital presence? Get in touch with our team
            of experts and discover how we can accelerate your business growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-poppins mb-6 text-white">
              Get In Touch
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  placeholder="Your Name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 resize-none rounded-lg"
                  placeholder="Tell us about your project..."
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full btn-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-poppins mb-6 text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  info: "contact@artradingplc.com",
                },
                { icon: "📞", title: "Phone", info: "+251 911 227 098" },
                {
                  icon: "📍",
                  title: "Address",
                  info: "3rd floor, Bass Addis Bldg. Bole\nAddis Ababa, Ethiopia",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {contact.title}
                    </h4>
                    <p className="text-gray-300 whitespace-pre-line">
                      {contact.info}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-6">
                <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {["📘", "🐦", "💼"].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Map Section */}
        <motion.div
          className="mirror-card p-2 rounded-2xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 flex items-center justify-center shadow-2xl">
            {/* Embedded Google Map */}
            <iframe
              title="AR Trading PLC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.669393698736!2d38.7725403!3d9.0122241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b851aa37d610d%3A0x53b55e8e74640bdf!2sBetopia%20site!5e0!3m2!1sen!2set!4v1715612345678!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-none"
            ></iframe>
            {/* Overlay with address and button */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/80 via-blue-900/60 to-transparent p-6 flex flex-col items-center z-10">
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Our Location
              </h4>
              <p className="text-cyan-100 text-base font-medium mb-3 drop-shadow">
                3rd floor, Bass Addis Bldg. Bole, Addis Ababa, Ethiopia
              </p>
              <motion.a
                href="https://www.google.com/maps/place/Betopia+site/@9.0122241,38.7725403,119m/data=!3m1!1e3!4m6!3m5!1s0x164b851aa37d610d:0x53b55e8e74640bdf!8m2!3d9.0122241!4d38.7731438!16s%2Fg%2F11sckb3__w?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on Google Maps
              </motion.a>
            </div>
            {/* Decorative Map Pin */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-xl border-4 border-white/30 text-white text-2xl animate-bounce">
                📍
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      className="py-12 px-4 sm:px-6 lg:px-8 glass"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <motion.h3
              className="text-2xl font-bold font-poppins gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              AR Trading PLC
            </motion.h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming businesses through innovative digital marketing
              solutions. Your success is our mission.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Services",
                "About",
                "Team",
                "Testimonials",
                "Contact",
              ].map((link, index) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Digital Strategy",
                "Brand Development",
                "SEO & Analytics",
                "Social Media",
                "Content Marketing",
                "E-commerce",
              ].map((service, index) => (
                <motion.li key={service} whileHover={{ x: 5 }}>
                  <span className="text-gray-300">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="text-center">
          <p className="text-gray-300">
            © 2024 AR Trading PLC. All rights reserved. Built with innovation
            and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Galaxy Background Component
const GalaxyBackground = () => {
  return (
    <>
      <div className="galaxy-bg"></div>
      <ScrollStars />
      <div className="stars">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>
    </>
  );
};

// Latest Works Section with Tabs
import { Fragment } from "react";

type WorkItem = {
  title: string;
  desc: string;
  image: string;
  client: string;
};

const tabNames = ["Web Development", "Digital Marketing", "Branding"] as const;

type TabName = (typeof tabNames)[number];

const latestWorks: Record<TabName, WorkItem[]> = {
  "Web Development": [
    {
      title: "Ethiopian Airlines Portal",
      desc: "A robust booking and management platform for Africa's largest airline.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Airlines",
    },
    {
      title: "Startup Launchpad",
      desc: "Modern landing page and dashboard for a fintech startup.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      client: "Fintech Startup",
    },
    {
      title: "Government e-Services",
      desc: "Secure web portal for public service delivery.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      client: "Gov. Agency",
    },
  ],
  "Digital Marketing": [
    {
      title: "Viral Social Campaign",
      desc: "Multi-platform campaign that increased engagement by 300%.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      client: "Retail Brand",
    },
    {
      title: "SEO Overhaul",
      desc: "Boosted organic traffic for a logistics company.",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Logistics Co.",
    },
    {
      title: "Influencer Partnership",
      desc: "Brand awareness campaign with top influencers.",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      client: "Consumer Goods",
    },
  ],
  Branding: [
    {
      title: "Rebranding for Haile Hospitality Group",
      desc: "Complete brand refresh for a leading hospitality group.",
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      client: "Haile Hospitality Group",
    },
    {
      title: "Logo & Identity Suite",
      desc: "Distinctive visual identity for a tech startup.",
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      client: "Tech Startup",
    },
    {
      title: "Government Brand Guidelines",
      desc: "Comprehensive branding for a government initiative.",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Gov. Initiative",
    },
  ],
};

const LatestWorksSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>(tabNames[0]);

  return (
    <section
      id="latest-works"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-blue-950/70 via-purple-950/60 to-cyan-950/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Latest Works
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-4 gradient-text">
            Our Latest Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our customer base ranges from small startups to big governmental
            firms.
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-full bg-gradient-to-r from-blue-900/60 to-purple-900/60 p-1 shadow-xl w-full max-w-2xl overflow-x-auto scrollbar-hide gap-2 sm:gap-0 sm:w-auto sm:max-w-none sm:overflow-visible"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="tablist"
          >
            {tabNames.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-shrink-0 px-6 py-3 sm:px-8 sm:py-2 rounded-full font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-blue-200 hover:bg-blue-800/30"
                  }
                `}
                aria-selected={activeTab === tab}
                aria-controls={`tab-panel-${tab}`}
                tabIndex={activeTab === tab ? 0 : -1}
                style={{ minWidth: "120px", scrollSnapAlign: "center" }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-4 right-4 bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    style={{ zIndex: 1 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Tab Panels */}
        <div className="relative min-h-[340px]">
          {tabNames.map((tab) => (
            <motion.div
              key={tab}
              id={`tab-panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              initial={false}
              animate={
                activeTab === tab
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.98 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                display: activeTab === tab ? "block" : "none",
                position: "absolute",
                width: "100%",
              }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {latestWorks[tab].map((work: WorkItem, idx: number) => (
                  <motion.div
                    key={work.title}
                    className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900/60 to-purple-900/60 border border-white/10 hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold font-poppins mb-1 text-white group-hover:text-blue-300 transition-colors">
                        {work.title}
                      </h3>
                      <div className="text-blue-400 font-medium mb-1 text-sm">
                        {work.client}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-0">
                        {work.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-blue-950/80 to-transparent pointer-events-none" />
    </section>
  );
};

// Main Page Component
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <IntroLoader />
      <GalaxyBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhoWeAreSection />
        <TeamSection />
        <LatestWorksSection />
        <TestimonialsSection />
        <PoweredBySection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
