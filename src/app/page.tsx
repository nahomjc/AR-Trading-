"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollStars from "./components/ScrollStars";
import CPUAnimation from "./components/CPUAnimation";
import PoweredBySection from "./components/PoweredBySection";

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                "Home",
                "Services",
                "About",
                "Team",
                "Testimonials",
                "Contact",
              ].map((item, index) => (
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
        </div>
      </div>
    </motion.nav>
  );
};

// Enhanced Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative hero-pattern"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>

      {/* CPU Animation Background */}
      <div className="absolute inset-0 opacity-30 z-0">
        <CPUAnimation />
      </div>

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

        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold font-poppins mb-8 leading-tight"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="gradient-text">Elevate Your Business</span>
          <br />
          <span className="text-white">to Digital Excellence</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AR Trading PLC delivers cutting-edge digital marketing solutions that
          drive exponential growth, enhance brand visibility, and create lasting
          customer relationships in today&apos;s competitive digital landscape.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#services"
            className="btn-primary hover-lift group"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Our Services</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary hover-lift"
            whileHover={{ scale: 1.05, y: -5 }}
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
          transition={{ duration: 1, delay: 1 }}
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
          <div className="h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Our Location
              </h4>
              <p className="text-gray-300">
                3rd floor, Bass Addis Bldg. Bole, Addis Ababa, Ethiopia
              </p>
              <motion.a
                href="https://maps.google.com/?q=Bass+Addis+Building+Bole+Addis+Ababa+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on Google Maps
              </motion.a>
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

// Main Page Component
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhoWeAreSection />
        <TeamSection />
        <TestimonialsSection />
        <PoweredBySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
