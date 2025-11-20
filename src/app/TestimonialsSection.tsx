"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IconStar, IconChevronLeft, IconChevronRight, IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    name: "Mr. Melkamu Mekonnen",
    role: "Group CEO at Haile Hospitality Group",
    content:
      "AR Solutions consistently delivers exceptional results. Their professional approach and attention to detail exceed expectations.",
    rating: 5,
  },
  {
    name: "Mr. Bikila Hurisa",
    role: "Public & International Relations Director at Prosperity Party",
    content:
      "Exemplary quality services in rebranding solutions. Outstanding reputation for excellence and reliability in the industry.",
    rating: 5,
  },
  {
    name: "Mr. Fisseha Asress",
    role: "Senior Consultant & Advisor at Ethiopian Airlines",
    content:
      "Confidently recommend AR Solutions for brand strategy, website development, digital marketing, and tech services. Exceptional project management with professionalism and expertise.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [carouselRef, setCarouselRef] = useState<HTMLDivElement | null>(null);

  // Handle testimonials section highlighting from search
  useEffect(() => {
    const storedTestimonials = sessionStorage.getItem("highlightTestimonials");
    if (storedTestimonials) {
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightTestimonials");
      }, 3000);
    }

    const handleHighlightTestimonials = () => {
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
    };

    window.addEventListener("highlightTestimonials", handleHighlightTestimonials);

    return () => {
      window.removeEventListener("highlightTestimonials", handleHighlightTestimonials);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#08243A]/50 via-transparent to-[#08243A]/50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C79D6D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className={`text-center mb-16 p-8 rounded-3xl transition-all duration-500 ${
            isHighlighted
              ? "bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 border border-[#C79D6D]/50 shadow-lg shadow-[#C79D6D]/20"
              : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 rounded-full text-[#C79D6D] text-sm font-semibold mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              What Our{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Clients Say
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Don&apos;t just take our word for it. Here&apos;s what industry
            leaders say about our work.
          </motion.p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Mobile Carousel / Desktop Grid */}
          <div className="relative">
            {/* Mobile Carousel */}
            <div
              ref={setCarouselRef}
              className="md:hidden flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group relative flex-shrink-0 w-[85vw] max-w-md"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Professional Testimonial Card */}
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-[#C79D6D]/50 hover:shadow-2xl hover:shadow-[#C79D6D]/20 transition-all duration-500 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-20">
                      <IconQuote className="w-12 h-12 text-[#C79D6D] rotate-180" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <IconStar className="w-5 h-5 text-[#C79D6D] fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg relative z-10 flex-1">
                      <span className="text-4xl text-[#C79D6D]/30 absolute -top-2 -left-2 leading-none">
                        &ldquo;
                      </span>
                      <span className="relative z-10 pl-4">{testimonial.content}</span>
                      <span className="text-4xl text-[#C79D6D]/30 absolute -bottom-6 -right-2 leading-none">
                        &rdquo;
                      </span>
                    </p>

                    {/* Client Info */}
                    <div className="pt-6 border-t border-white/10">
                      <h4 className="font-bold text-white text-lg mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#C79D6D] text-sm font-medium">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C79D6D] to-[#d4a574] opacity-50"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel Navigation */}
            <div className="md:hidden flex justify-center items-center gap-4 mt-8">
              <motion.button
                onClick={() => {
                  if (carouselRef) {
                    carouselRef.scrollBy({
                      left: -320,
                      behavior: "smooth",
                    });
                  }
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 text-[#C79D6D] flex items-center justify-center hover:from-[#C79D6D] hover:to-[#d4a574] hover:text-white transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={() => {
                  if (carouselRef) {
                    carouselRef.scrollBy({
                      left: 320,
                      behavior: "smooth",
                    });
                  }
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 text-[#C79D6D] flex items-center justify-center hover:from-[#C79D6D] hover:to-[#d4a574] hover:text-white transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Professional Testimonial Card */}
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-[#C79D6D]/50 hover:shadow-2xl hover:shadow-[#C79D6D]/20 transition-all duration-500 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      <IconQuote className="w-16 h-16 text-[#C79D6D] rotate-180" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 + index * 0.1 }}
                        >
                          <IconStar className="w-6 h-6 text-[#C79D6D] fill-current group-hover:scale-110 transition-transform duration-300" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg relative z-10 flex-1">
                      <span className="text-5xl text-[#C79D6D]/30 absolute -top-4 -left-2 leading-none font-serif">
                        &ldquo;
                      </span>
                      <span className="relative z-10 pl-6">{testimonial.content}</span>
                      <span className="text-5xl text-[#C79D6D]/30 absolute -bottom-8 -right-2 leading-none font-serif">
                        &rdquo;
                      </span>
                    </p>

                    {/* Client Info */}
                    <div className="pt-6 border-t border-white/10 group-hover:border-[#C79D6D]/30 transition-colors duration-300">
                      <h4 className="font-bold text-white text-xl mb-2 group-hover:text-[#C79D6D] transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#C79D6D] text-sm font-medium">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C79D6D] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
