import { motion } from "framer-motion";

const TeamSection = () => {
  const team = [
    {
      name: "Abenezer Samuel",
      role: "General Manager",
      image: "/img/image1.jpg",
      description:
        "Experienced leader overseeing operations and strategic direction",
      socials: {
        linkedin: "https://linkedin.com/in/abenezersamuel",
        twitter: "https://twitter.com/abenezersamuel",
        facebook: "https://facebook.com/abenezersamuel",
      },
    },
    {
      name: "Keneni Melkamu",
      role: "Digital Marketer",
      image: "/img/image2.jpg",
      description:
        "Expert in digital campaigns, SEO, and social media marketing",
      socials: {
        linkedin: "https://linkedin.com/in/kenenimelkamu",
        twitter: "https://twitter.com/kenenimelkamu",
        facebook: "https://facebook.com/kenenimelkamu",
      },
    },
    {
      name: "Nahom Tesfaye",
      role: "Senior Software Engineer",
      image: "/img/image3.jpg",
      description:
        "Full-stack developer specializing in modern web technologies",
      socials: {
        linkedin: "https://linkedin.com/in/nahomtesfaye",
        twitter: "https://twitter.com/nahomtesfaye",
        facebook: "https://facebook.com/nahomtesfaye",
      },
    },
  ];

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
              className="flex justify-center"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Hanging badge effect: real image and social icons */}
              <motion.div
                className="flex flex-col items-center relative"
                style={{ perspective: 400 }}
                animate={{
                  rotateZ: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 3.2 + index * 0.1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                {/* Hanging rope (lanyard) */}
                <div className="w-2 h-14 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400 rounded-full mb-[-18px] z-20" />
                {/* Badge with all info */}
                <div className="relative mirror-card bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 border border-blue-400/30 shadow-2xl rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-64 lg:h-72 flex flex-col items-center justify-start pt-6 pb-4 px-2 sm:px-4">
                  {/* Metallic ring/hole */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 flex flex-col items-center z-10">
                    <div
                      className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-gray-300 shadow-inner"
                      style={{ marginBottom: -8 }}
                    />
                    <div className="w-2 h-2 bg-gray-100 rounded-full border border-gray-300 absolute top-1 left-1/2 -translate-x-1/2" />
                  </div>
                  {/* Avatar image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-lg mb-2 mt-2 z-10"
                    style={{ marginTop: 8 }}
                  />
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 mb-3" />
                  <h3 className="text-lg font-bold font-poppins text-white mb-1 text-center w-full px-2">
                    {member.name}
                  </h3>
                  <div className="text-blue-200 font-medium mb-2 text-center w-full px-2">
                    {member.role}
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed text-center w-full mt-1 mb-2">
                    {member.description}
                  </p>
                  {/* Social icons */}
                  <div className="flex justify-center gap-4 mt-auto pt-2">
                    {Object.entries(member.socials).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group hover:scale-110 transition-transform"
                        aria-label={key}
                      >
                        {socialIcons[key as keyof typeof socialIcons]}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
