"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            About Our Company
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Excellence. Innovation. Results.
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a premier digital marketing and creative agency dedicated to
            transforming businesses through strategic innovation and exceptional
            execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="mirror-card p-8 lg:p-12 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-outfit mb-6 text-white">
              Our Mission & Vision
            </h3>
            <h4 className="text-xl font-semibold text-[#C69c6c] mb-4">
              Strategic Excellence. Creative Innovation. Measurable Results.
            </h4>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              AR Solutions stands as a leading multi-service creative and
              commercial agency, delivering comprehensive advertising, branding,
              printing, media production, and business solutions with unwavering
              commitment to excellence.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We combine innovative ideas with practical execution, helping our
              clients grow, connect, and stand out in today&apos;s competitive
              world.
            </p>
            <div className="mb-8">
              <span className="inline-block text-2xl mr-2 align-middle">
                💡
              </span>
              <span className="font-bold text-white text-lg align-middle">
                Our Purpose
              </span>
              <p className="text-lg text-gray-300 mt-2 leading-relaxed">
                We exist to elevate brands, simplify solutions, and deliver
                quality with heart. Whether you&apos;re a startup or an
                established business, we offer tailored services that align with
                your goals and exceed expectations.
              </p>
            </div>
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
            <div className="relative">
              {/* Professional Image Container */}
              <div className="mirror-card p-4 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30 rounded-2xl overflow-hidden">
                <Image
                  src="/img/about-us-11.png"
                  alt="Professional team collaboration and digital excellence"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Professional Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-gradient-to-r from-[#C69c6c] to-[#d4a574] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Professional Excellence
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
