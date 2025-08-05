import { motion } from "framer-motion";

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

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
          Testimonials
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 gradient-text">
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

export default TestimonialsSection;
