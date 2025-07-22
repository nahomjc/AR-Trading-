"use client";

import { motion } from "framer-motion";

const marketingChannels = [
  {
    name: "Social Media",
    icon: "📱",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/40",
    position: 0,
  },
  {
    name: "SEO/SEM",
    icon: "🔍",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/40",
    position: 1,
  },
  {
    name: "Content Marketing",
    icon: "📝",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/40",
    position: 2,
  },
  {
    name: "Email Marketing",
    icon: "📧",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-500/20",
    borderColor: "border-pink-400/40",
    position: 3,
  },
];

export default function PoweredBySection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Nebula Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-wider mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              MARKETING SYSTEM
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our integrated digital marketing ecosystem powering your business
            growth
          </p>
        </motion.div>

        {/* Marketing Network Visualization */}
        <div className="relative flex flex-col items-center justify-center min-h-[600px]">
          {/* CPU at the top */}
          <div className="relative mb-16 flex items-center justify-center">
            {/* Animated SVG CPU with glowing circuits and particles (copied from CPUAnimation) */}
            <div className="relative">
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="relative z-10"
              >
                <defs>
                  {/* Glowing animated gradient for circuits */}
                  <radialGradient id="cpuGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient
                    id="circuitGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient
                    id="circuitPulse"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a5f3fc">
                      <animate
                        attributeName="stop-color"
                        values="#a5f3fc;#a78bfa;#a5f3fc"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#a78bfa">
                      <animate
                        attributeName="stop-color"
                        values="#a78bfa;#06b6d4;#a78bfa"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                </defs>

                {/* Glowing background around CPU */}
                <circle cx="150" cy="150" r="60" fill="url(#cpuGlow)" />

                {/* Circuit lines (many, radiating to edge, glowing, animated) */}
                {(() => {
                  const numCircuits = 20;
                  const maxRadius = 140; // SVG edge
                  const types: Array<"straight" | "elbow" | "curve"> = [
                    "straight",
                    "elbow",
                    "curve",
                  ];
                  return Array.from({ length: numCircuits }).map((_, i) => {
                    const angle = (2 * Math.PI * i) / numCircuits;
                    const type = types[i % types.length];
                    const r1 = 80;
                    const r2 = maxRadius + (i % 2 === 0 ? 8 : -8); // slight variation
                    const cx = 150 + Math.cos(angle) * r1;
                    const cy = 150 + Math.sin(angle) * r1;
                    const ex = 150 + Math.cos(angle) * r2;
                    const ey = 150 + Math.sin(angle) * r2;
                    let d = "";
                    if (type === "straight") {
                      d = `M150 150 L${ex} ${ey}`;
                    } else if (type === "elbow") {
                      const mx = 150 + Math.cos(angle) * (r1 + (r2 - r1) * 0.5);
                      const my = 150 + Math.sin(angle) * (r1 + (r2 - r1) * 0.5);
                      const elbowAngle =
                        angle + (Math.PI / 2) * (i % 2 === 0 ? 1 : -1);
                      const ex2 = mx + Math.cos(elbowAngle) * ((r2 - r1) * 0.3);
                      const ey2 = my + Math.sin(elbowAngle) * ((r2 - r1) * 0.3);
                      d = `M150 150 L${mx} ${my} L${ex2} ${ey2}`;
                    } else {
                      const c1x =
                        150 + Math.cos(angle - 0.18) * (r1 + (r2 - r1) * 0.4);
                      const c1y =
                        150 + Math.sin(angle - 0.18) * (r1 + (r2 - r1) * 0.4);
                      d = `M150 150 Q${c1x} ${c1y}, ${ex} ${ey}`;
                    }
                    return (
                      <g key={i}>
                        <motion.path
                          d={d}
                          stroke="url(#circuitPulse)"
                          strokeWidth="2.2"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.06,
                            ease: "easeInOut",
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 0 8px #a5f3fc) drop-shadow(0 0 16px #a78bfa)",
                          }}
                        />
                        {/* Glowing endpoint */}
                        <motion.circle
                          cx={ex}
                          cy={ey}
                          r={5}
                          fill="url(#circuitPulse)"
                          style={{ filter: "blur(2px) opacity(0.7)" }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
                          transition={{
                            duration: 1.1,
                            delay: 0.5 + i * 0.06,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <circle
                          cx={ex}
                          cy={ey}
                          r={2.1}
                          fill="#fff"
                          opacity={0.85}
                        />
                      </g>
                    );
                  });
                })()}

                {/* CPU Chip in the center */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  {/* CPU Main Body */}
                  <rect
                    x="120"
                    y="120"
                    width="60"
                    height="60"
                    rx="8"
                    fill="#18181b"
                    stroke="#a5f3fc"
                    strokeWidth="2.5"
                    style={{ filter: "drop-shadow(0 0 16px #a5f3fc)" }}
                  />
                  {/* CPU Grid Pattern */}
                  {[...Array(4)].map((_, row) =>
                    [...Array(4)].map((_, col) => (
                      <motion.circle
                        key={`${row}-${col}`}
                        cx={130 + col * 10}
                        cy={130 + row * 10}
                        r="1.7"
                        fill="#a5f3fc"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 2 + (row * 4 + col) * 0.05,
                        }}
                      />
                    ))
                  )}
                  {/* CPU Pins */}
                  {[...Array(8)].map((_, i) => (
                    <motion.rect
                      key={`pin-top-${i}`}
                      x={125 + i * 6}
                      y="115"
                      width="2"
                      height="5"
                      fill="#a5f3fc"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.2, delay: 2.2 + i * 0.05 }}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <motion.rect
                      key={`pin-bottom-${i}`}
                      x={125 + i * 6}
                      y="180"
                      width="2"
                      height="5"
                      fill="#a5f3fc"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.2, delay: 2.3 + i * 0.05 }}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <motion.rect
                      key={`pin-left-${i}`}
                      x="115"
                      y={125 + i * 6}
                      width="5"
                      height="2"
                      fill="#a5f3fc"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.2, delay: 2.4 + i * 0.05 }}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <motion.rect
                      key={`pin-right-${i}`}
                      x="180"
                      y={125 + i * 6}
                      width="5"
                      height="2"
                      fill="#a5f3fc"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.2, delay: 2.5 + i * 0.05 }}
                    />
                  ))}
                </motion.g>

                {/* Pulsing rings around CPU */}
                {[1, 2, 3].map((ring) => (
                  <motion.circle
                    key={ring}
                    cx="150"
                    cy="150"
                    r={40 + ring * 15}
                    fill="none"
                    stroke="#a5f3fc44"
                    strokeWidth="1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: ring * 0.5 + 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </svg>

              {/* Data Flow Particles (glowing) */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (Math.PI * 2 * i) / 16;
                const r2 = 210;
                const ex = 150 + Math.cos(angle) * r2;
                const ey = 150 + Math.sin(angle) * r2;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-lg"
                    style={{
                      left: 150,
                      top: 150,
                      boxShadow: "0 0 12px #a5f3fc, 0 0 24px #a78bfa",
                    }}
                    animate={{
                      x: ex - 150,
                      y: ey - 150,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.13 + 2.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Marketing Channel Cards in a circle around CPU */}
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
            {marketingChannels.map((channel, index) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection node at card */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full border-2 border-white shadow-lg z-10">
                  <motion.div
                    className="absolute inset-1 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>

                <div
                  className={`${channel.bgColor} ${channel.borderColor} backdrop-blur-sm border-2 rounded-2xl p-6 text-center min-w-[180px] hover:scale-105 transition-all duration-300 group shadow-2xl relative z-20`}
                >
                  <div className="text-4xl mb-3">{channel.icon}</div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {channel.name}
                  </div>
                  <div
                    className={`w-full h-1 bg-gradient-to-r ${channel.color} rounded-full opacity-80 group-hover:opacity-100 transition-opacity`}
                  ></div>

                  {/* Data flow indicator */}
                  <motion.div
                    className={`absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r ${channel.color} rounded-full`}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              PROVEN PERFORMANCE
            </span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "400%", label: "ROI Growth", color: "text-emerald-400" },
              { value: "3.2x", label: "Lead Increase", color: "text-blue-400" },
              { value: "92%", label: "Success Rate", color: "text-purple-400" },
              { value: "24/7", label: "Optimization", color: "text-cyan-400" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-gray-300 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
