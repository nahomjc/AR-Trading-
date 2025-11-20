import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  // Handle testimonials section highlighting from search
  useEffect(() => {
    // Check if there's a highlighted testimonials from search
    const storedTestimonials = sessionStorage.getItem("highlightTestimonials");
    if (storedTestimonials) {
      setIsHighlighted(true);
      // Clear the stored value after a delay
      setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightTestimonials");
      }, 3000); // Highlight for 3 seconds
    }

    // Listen for highlight events from search
    const handleHighlightTestimonials = () => {
      setIsHighlighted(true);
      // Clear highlight after 3 seconds
      setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
    };

    window.addEventListener(
      "highlightTestimonials",
      handleHighlightTestimonials
    );

    return () => {
      window.removeEventListener(
        "highlightTestimonials",
        handleHighlightTestimonials
      );
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className={`text-center mb-16 p-6 rounded-xl transition-all duration-500 ${
            isHighlighted
              ? "bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 border border-[#C69c6c]/50 shadow-lg shadow-[#C69c6c]/20 animate-pulse"
              : ""
          }`}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            What Clients Say
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
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
              className="testimonial-card p-8 hover-lift bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30"
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
                <p className="text-[#C69c6c] text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
