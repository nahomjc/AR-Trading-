"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";

// Contact Section with Google Map
const ContactSection = () => {
  const [highlightedContact, setHighlightedContact] = useState<string | null>(
    null
  );

  // Handle contact highlighting from search
  useEffect(() => {
    // Check if there's a highlighted contact from search
    const storedContact = sessionStorage.getItem("highlightContact");
    if (storedContact) {
      setHighlightedContact(storedContact);
      // Clear the stored value after a delay
      setTimeout(() => {
        setHighlightedContact(null);
        sessionStorage.removeItem("highlightContact");
      }, 3000); // Highlight for 3 seconds
    }

    // Listen for highlight events from search
    const handleHighlightContact = (event: CustomEvent) => {
      const contactType = event.detail.contactType;
      setHighlightedContact(contactType);
      // Clear highlight after 3 seconds
      setTimeout(() => {
        setHighlightedContact(null);
      }, 3000);
    };

    window.addEventListener(
      "highlightContact",
      handleHighlightContact as EventListener
    );

    return () => {
      window.removeEventListener(
        "highlightContact",
        handleHighlightContact as EventListener
      );
    };
  }, []);

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#08243A]/90 via-[#08243A]/85 to-[#08243A]/90"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            Contact Us
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
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
            <h3 className="text-2xl font-semibold font-outfit mb-6 text-white">
              Get In Touch
            </h3>

            <form
              action="https://getform.io/f/byvevxpa"
              method="POST"
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                    placeholder="Your Name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <motion.input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                    placeholder="Your Phone"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                  placeholder="Subject of your message"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] resize-none rounded-lg placeholder-gray-400"
                  placeholder="Tell us about your project, requirements, or any questions you have..."
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full btn-secondary transition-all duration-300 hover:scale-105"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 0 16px #C69c6c",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>

              <p className="text-xs text-gray-400 text-center">
                * Your message will be sent directly to our team
              </p>
            </form>
          </motion.div>

          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-outfit mb-6 text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: IconMail,
                  title: "Email",
                  info: "artradingplc@gmail.com",
                },
                { icon: IconPhone, title: "Phone", info: "0988175550" },
                {
                  icon: IconMapPin,
                  title: "Address",
                  info: "9th floor, Kazadis Bldg, Kazanchis\nAddis Ababa, Ethiopia",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                    highlightedContact === contact.title.toLowerCase()
                      ? "bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 border border-[#C69c6c]/50 shadow-lg shadow-[#C69c6c]/20 animate-pulse"
                      : "hover:bg-white/5"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/40 rounded-full flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-br hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300">
                    <contact.icon className="w-6 h-6" />
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
                  {[
                    {
                      icon: IconBrandFacebook,
                      href: "https://www.facebook.com/arsolutionsethiopia",
                      label: "Facebook",
                    },
                    {
                      icon: IconBrandTwitter,
                      href: "https://www.twitter.com/arsolutionset",
                      label: "Twitter",
                    },
                    {
                      icon: IconBrandLinkedin,
                      href: "https://www.linkedin.com/company/ar-solutions-ethiopia",
                      label: "LinkedIn",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/40 rounded-full flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-br hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="w-5 h-5" />
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
              title="AR Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4248.424677904093!2d38.77295590000001!3d9.011854399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b852ce1410c23%3A0xe500072b801f3134!2sAR%20Solutions%20Trading%20PLC!5e1!3m2!1sen!2set!4v1754757264346!5m2!1sen!2set"
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
                9th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia
              </p>
              <motion.a
                href="https://www.google.com/maps/place/Betopia+site/@9.0122241,38.7725403,119m/data=!3m1!1e3!4m6!3m5!1s0x164b851aa37d610d:0x53b55e8e74640bdf!8m2!3d9.0122241!4d38.7731438!16s%2Fg%2F11sckb3__w?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 16px #C69c6c" }}
                whileTap={{ scale: 0.95 }}
              >
                View on Google Maps
              </motion.a>
            </div>
            {/* Decorative Map Pin */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-xl border-4 border-white/30 text-white animate-bounce">
                <IconMapPin className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
