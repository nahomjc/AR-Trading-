import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

// Typewriter effect component
const TypewriterText = ({
  text,
  isVisible,
}: {
  text: string;
  isVisible: boolean;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [isVisible, currentIndex, text]);

  return <span>{displayText}</span>;
};

// Modal component
const TeamModal = ({
  member,
  isOpen,
  onClose,
}: {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const socialIcons = {
    linkedin: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        className="text-blue-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          d="M16 8a6 6 0 0 1 6 6v5.25a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V14a2 2 0 0 0-4 0v5.25a.75.75 0 0 1-.75.75h-3.5A.75.75 0 0 1 8 19.25V9a.75.75 0 0 1 .75-.75h3.5A.75.75 0 0 1 13 9v.75A6 6 0 0 1 16 8Z"
          fill="currentColor"
        />
        <rect x="2" y="9" width="4" height="10" rx="1" fill="currentColor" />
      </svg>
    ),
    twitter: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        className="text-blue-300 group-hover:text-blue-400 transition-colors"
      >
        <path
          d="M22 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.5 9.5c0 .352.04.695.116 1.022C7.728 10.37 4.1 8.6 1.67 5.905a4.48 4.48 0 0 0-.607 2.257c0 1.557.793 2.933 2.002 3.74a4.48 4.48 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.07a12.68 12.68 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.6.713Z"
          fill="currentColor"
        />
      </svg>
    ),
    facebook: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        className="text-blue-500 group-hover:text-blue-600 transition-colors"
      >
        <path
          d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 backdrop-blur-xl border border-[#C69c6c]/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="relative p-8 pb-0">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-blue-300 font-semibold text-lg mb-2">
                    {member.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 pt-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-blue-200 mb-4">
                  Professional Profile
                </h4>
                <div className="text-gray-200 leading-relaxed text-base">
                  <TypewriterText
                    text={`${
                      member.name
                    } is a ${member.role.toLowerCase()} with extensive experience in their field. ${
                      member.description
                    } They bring innovative solutions and strategic thinking to every project, ensuring exceptional results for clients and stakeholders.`}
                    isVisible={isOpen}
                  />
                </div>
              </div>

              {/* Skills/Expertise */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-200 mb-4">
                  Key Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getExpertiseByRole(member.role).map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-sm text-blue-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function to get expertise based on role
const getExpertiseByRole = (role: string) => {
  switch (role) {
    case "General Manager and Co-founder":
      return [
        "Strategic Planning",
        "Operations Management",
        "Team Leadership",
        "Business Development",
      ];
    case "General Manager":
      return [
        "Strategic Planning",
        "Operations Management",
        "Team Leadership",
        "Business Development",
      ];
    case "Digital Marketer":
      return [
        "Social Media Marketing",
        "SEO Optimization",
        "Content Strategy",
        "Campaign Management",
      ];
    case "Senior Software Engineer":
      return [
        "Full-Stack Development",
        "Modern Frameworks",
        "System Architecture",
        "API Development",
      ];
    default:
      return [
        "Professional Skills",
        "Industry Expertise",
        "Problem Solving",
        "Innovation",
      ];
  }
};

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);
  const [highlightedEmployee, setHighlightedEmployee] = useState<string | null>(
    null
  );

  const team: TeamMember[] = [
    {
      name: "Robson Habtamu",
      role: "General Manager and Co-founder",
      image: "/img/image-ceo.jpg",
      description: "General manager and co-founder of AR Trading PLC",
    },
    {
      name: "Abenezer Samuel",
      role: "CEO and co - founder",
      image: "/img/image1.jpg",
      description:
        "Strategic leader managing operations and business direction",
    },
    {
      name: "Keneni Melkamu",
      role: "Digital Marketer",
      image: "/img/image2.jpg",
      description: "Digital marketing expert specializing in campaigns and SEO",
    },
    {
      name: "Nahom Tesfaye",
      role: "Senior Software Engineer",
      image: "/img/image3.jpg",
      description: "Full-stack developer with modern web technology expertise",
    },
  ];

  // Handle employee highlighting from search
  useEffect(() => {
    // Check if there's a highlighted employee from search
    const storedEmployee = sessionStorage.getItem("highlightEmployee");
    if (storedEmployee) {
      setHighlightedEmployee(storedEmployee);
      // Find and open the employee modal after a delay to show highlighting
      const employee = team.find((member) => member.name === storedEmployee);
      if (employee) {
        setTimeout(() => {
          setHoveredMember(employee);
        }, 1500); // Delay modal opening by 1.5 seconds
      }
      // Clear the stored value after a delay
      setTimeout(() => {
        setHighlightedEmployee(null);
        sessionStorage.removeItem("highlightEmployee");
      }, 3000); // Highlight for 3 seconds
    }

    // Listen for highlight events from search
    const handleHighlightEmployee = (event: CustomEvent) => {
      const employeeName = event.detail.employeeName;
      setHighlightedEmployee(employeeName);
      // Find and open the employee modal after a delay to show highlighting
      const employee = team.find((member) => member.name === employeeName);
      if (employee) {
        setTimeout(() => {
          setHoveredMember(employee);
        }, 1500); // Delay modal opening by 1.5 seconds
      }
      // Clear highlight after 3 seconds
      setTimeout(() => {
        setHighlightedEmployee(null);
      }, 3000);
    };

    window.addEventListener(
      "highlightEmployee",
      handleHighlightEmployee as EventListener
    );

    return () => {
      window.removeEventListener(
        "highlightEmployee",
        handleHighlightEmployee as EventListener
      );
    };
  }, [team]);

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Elegant Badge */}
          <motion.div
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#C69c6c]/15 via-[#d4a574]/15 to-[#C69c6c]/15 backdrop-blur-2xl border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-bold mb-12 tracking-wider shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-[#C69c6c] rounded-full mr-4 animate-pulse"></div>
            OUR PROFESSIONAL TEAM
            <div className="w-2 h-2 bg-[#C69c6c] rounded-full ml-4 animate-pulse"></div>
          </motion.div>

          {/* Elegant Title */}
          <motion.h2
            className="text-5xl sm:text-7xl font-bold font-outfit mb-8 text-[#C79D6D] leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Meet Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C79D6D] via-[#d4a574] to-[#C79D6D]">
              Expert Team
            </span>
          </motion.h2>

          {/* Elegant Description */}
          <motion.p
            className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Our talented professionals bring together diverse expertise and
            innovative thinking to deliver
            <span className="text-[#C69c6c] font-semibold">
              {" "}
              exceptional results
            </span>{" "}
            that exceed expectations and drive success for our valued clients.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -20, scale: 1.05 }}
            >
              {/* Modern Professional Card */}
              <div
                className={`relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-3xl border rounded-2xl p-6 transition-all duration-800 cursor-pointer overflow-hidden shadow-2xl group ${
                  highlightedEmployee === member.name
                    ? "border-[#C69c6c] shadow-[#C69c6c]/50 ring-4 ring-[#C69c6c]/30 animate-pulse"
                    : "border-slate-700/40 hover:border-[#C69c6c]/80 hover:shadow-[#C69c6c]/30"
                }`}
                onClick={() => {
                  console.log("Clicked:", member.name);
                  setHoveredMember(member);
                }}
              >
                {/* Elegant Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C69c6c]/5 via-transparent to-[#C69c6c]/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(198,156,108,0.08),transparent_40%)]"></div>

                {/* Top Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C69c6c] via-[#d4a574] to-[#C69c6c] rounded-t-2xl ${
                    highlightedEmployee === member.name ? "animate-pulse" : ""
                  }`}
                ></div>

                {/* Floating Accent Dots */}
                <div className="absolute top-8 right-8 w-2 h-2 bg-[#C69c6c] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-800 transform scale-0 group-hover:scale-100"></div>
                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-[#d4a574] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-800 delay-300 transform scale-0 group-hover:scale-100"></div>

                {/* Large Profile Image Section */}
                <div className="relative flex justify-center mb-6">
                  <div className="relative">
                    {/* Main Large Image Container */}
                    <div
                      className={`relative w-32 h-32 rounded-full overflow-hidden ring-4 transition-all duration-700 shadow-2xl ${
                        highlightedEmployee === member.name
                          ? "ring-[#C69c6c] shadow-[#C69c6c]/40 animate-pulse"
                          : "ring-[#C69c6c]/20 group-hover:ring-[#C69c6c]/50 group-hover:shadow-[#C69c6c]/20"
                      }`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 grayscale group-hover:grayscale-0"
                      />
                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Elegant Status Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#C69c6c]/30 animate-pulse"></div>

                    {/* Subtle Corner Accents */}
                    <div className="absolute -top-3 -left-3 w-3 h-3 bg-[#C69c6c]/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-400"></div>
                    <div className="absolute -top-3 -right-3 w-2 h-2 bg-[#d4a574]/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-500"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 text-center">
                  {/* Name with Elegant Typography */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-[#C69c6c] transition-all duration-600 leading-tight">
                    {member.name}
                  </h3>

                  {/* Professional Role Badge */}
                  <div className="inline-block bg-gradient-to-r from-[#C69c6c]/15 via-[#d4a574]/15 to-[#C69c6c]/15 backdrop-blur-xl border border-[#C69c6c]/30 rounded-full px-6 py-3 mb-6 shadow-lg group-hover:border-[#C69c6c]/60 transition-all duration-600">
                    <span className="text-[#C69c6c] font-semibold text-sm lg:text-base tracking-wide">
                      {member.role}
                    </span>
                  </div>

                  {/* Elegant Action Button */}
                  <div className="flex items-center justify-center space-x-4 text-gray-300 group-hover:text-[#C69c6c] transition-all duration-600">
                    <span className="text-base font-medium tracking-wide">
                      View Profile
                    </span>
                    <div className="relative">
                      <svg
                        className="w-6 h-6 transform group-hover:translate-x-3 transition-transform duration-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C69c6c]/8 via-transparent to-[#C69c6c]/8 opacity-0 group-hover:opacity-100 transition-all duration-800 rounded-2xl"></div>

                {/* Subtle Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C69c6c]/10 via-transparent to-[#C69c6c]/10 opacity-0 group-hover:opacity-100 transition-all duration-800 blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <TeamModal
          member={hoveredMember}
          isOpen={!!hoveredMember}
          onClose={() => setHoveredMember(null)}
        />
      </div>
    </section>
  );
};

export default TeamSection;
