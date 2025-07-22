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
          <div className="relative mb-16">
            {/* Realistic CPU Processor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                {/* CPU Package */}
                <div className="w-40 h-32 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-2 border-slate-600 rounded-lg shadow-2xl relative overflow-hidden">
                  {/* CPU Die */}
                  <div className="absolute inset-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-md border border-slate-500">
                    {/* Silicon Die Pattern */}
                    <div className="absolute inset-1 grid grid-cols-8 grid-rows-6 gap-0.5">
                      {[...Array(48)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.1, delay: 2 + i * 0.01 }}
                          className={`bg-gradient-to-br from-slate-500/40 to-slate-600/40 rounded-sm ${
                            i % 3 === 0 ? "bg-blue-500/30" : ""
                          } ${i % 7 === 0 ? "bg-green-500/30" : ""}`}
                        />
                      ))}
                    </div>

                    {/* CPU Cores */}
                    <div className="absolute inset-2 grid grid-cols-2 grid-rows-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 2.5 + i * 0.1 }}
                          className="bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-sm border border-blue-400/50"
                        />
                      ))}
                    </div>

                    {/* Cache Memory */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-1 bg-gradient-to-r from-yellow-500/60 to-orange-500/60 rounded-full" />
                    </div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-1 bg-gradient-to-r from-yellow-500/60 to-orange-500/60 rounded-full" />
                    </div>
                  </div>

                  {/* CPU Pins */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 h-2 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-sm shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 h-2 bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-sm shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 flex flex-col space-y-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-300 rounded-sm shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 flex flex-col space-y-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-sm shadow-sm"
                      />
                    ))}
                  </div>

                  {/* Heat Sink */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-36 h-2 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t-lg">
                      <div className="flex justify-between px-2">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-slate-300 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CPU Label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-600">
                      MKT-CPU v2.1
                    </div>
                  </div>
                </div>

                {/* Circuit Board Traces */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top trace */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-green-400 to-transparent" />
                  {/* Bottom trace */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-green-400 to-transparent" />
                  {/* Left trace */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-green-400 to-transparent" />
                  {/* Right trace */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-l from-green-400 to-transparent" />
                </div>

                {/* Pulsing Core Activity */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="absolute inset-3 grid grid-cols-2 grid-rows-2 gap-1"
                  >
                    <div className="bg-blue-500/20 rounded-sm" />
                    <div className="bg-purple-500/20 rounded-sm" />
                    <div className="bg-green-500/20 rounded-sm" />
                    <div className="bg-yellow-500/20 rounded-sm" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Circuit Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* White line for Social Media connection - starts from green circle, goes up, bends right, connects to CPU */}
            <motion.div
              className="absolute left-[85%] top-[35%] w-1 h-[15%] bg-white rounded-full z-50"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                transformOrigin: "top",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            />

            <motion.div
              className="absolute left-[50%] top-[20%] w-[35%] h-1 bg-white rounded-full z-50"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                transformOrigin: "right",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
            />

            <motion.div
              className="absolute left-[50%] top-[20%] w-1 h-[10%] bg-white rounded-full z-50"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                transformOrigin: "top",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
            />

            {marketingChannels.map((channel, index) => {
              // Calculate positions for proper end-to-end connections
              const cpuCenterX = 50; // CPU center X percentage
              const cpuCenterY = 25; // CPU center Y percentage

              // Position cards in a circle around CPU
              const angle = index * 90 * (Math.PI / 180); // 0°, 90°, 180°, 270°
              const cardDistance = 35; // Distance from CPU center

              // Calculate card positions
              const cardX = cpuCenterX + Math.cos(angle) * cardDistance;
              const cardY = cpuCenterY + Math.sin(angle) * cardDistance + 15; // Offset for card layout

              // Create path points - straight line for Social Media, zigzag for others
              const createPath = (
                startX: number,
                startY: number,
                endX: number,
                endY: number,
                isSocialMedia: boolean
              ) => {
                if (isSocialMedia) {
                  // Straight line for Social Media going to the right
                  return `${startX}% ${startY}% L ${endX}% ${endY}%`;
                } else {
                  // Zigzag pattern for other channels
                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;
                  const offset = 8; // Zigzag amplitude

                  // Create zigzag pattern
                  const points = [
                    `${startX}% ${startY}%`,
                    `${startX + (midX - startX) * 0.3}% ${startY + offset}%`,
                    `${startX + (midX - startX) * 0.7}% ${startY - offset}%`,
                    `${midX}% ${midY + offset}%`,
                    `${midX + (endX - midX) * 0.3}% ${midY - offset}%`,
                    `${midX + (endX - midX) * 0.7}% ${midY + offset}%`,
                    `${endX}% ${endY}%`,
                  ];

                  return points.join(" L ");
                }
              };

              return (
                <svg
                  key={`connection-${index}`}
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  {/* Circuit path - straight for Social Media, zigzag for others */}
                  <motion.path
                    d={`M ${createPath(
                      cpuCenterX,
                      cpuCenterY,
                      cardX,
                      cardY,
                      index === 0 // isSocialMedia (Social Media is at index 0)
                    )}`}
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 3 + index * 0.4 }}
                    className="drop-shadow-lg"
                  />

                  {/* Circuit connection points along the path */}
                  {[0.2, 0.4, 0.6, 0.8].map((progress, pointIndex) => {
                    const pointX = cpuCenterX + (cardX - cpuCenterX) * progress;
                    const pointY = cpuCenterY + (cardY - cpuCenterY) * progress;
                    const offset = Math.sin(progress * Math.PI) * 8;

                    return (
                      <motion.circle
                        key={`point-${index}-${pointIndex}`}
                        cx={`${pointX}%`}
                        cy={`${pointY + offset}%`}
                        r="2"
                        fill={
                          channel.color.includes("blue")
                            ? "#3B82F6"
                            : channel.color.includes("green")
                            ? "#10B981"
                            : channel.color.includes("purple")
                            ? "#8B5CF6"
                            : "#EC4899"
                        }
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 4 + index * 0.4 + pointIndex * 0.6,
                        }}
                      />
                    );
                  })}

                  {/* Animated data flow particles */}
                  <motion.circle
                    cx={`${cpuCenterX}%`}
                    cy={`${cpuCenterY}%`}
                    r="3"
                    fill={
                      channel.color.includes("blue")
                        ? "#3B82F6"
                        : channel.color.includes("green")
                        ? "#10B981"
                        : channel.color.includes("purple")
                        ? "#8B5CF6"
                        : "#EC4899"
                    }
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    animate={{
                      cx: [`${cpuCenterX}%`, `${cardX}%`],
                      cy: [`${cpuCenterY}%`, `${cardY}%`],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: 5 + index * 0.8,
                    }}
                  />

                  {/* Connection node at CPU */}
                  <motion.circle
                    cx={`${cpuCenterX}%`}
                    cy={`${cpuCenterY}%`}
                    r="5"
                    fill={
                      channel.color.includes("blue")
                        ? "#3B82F6"
                        : channel.color.includes("green")
                        ? "#10B981"
                        : channel.color.includes("purple")
                        ? "#8B5CF6"
                        : "#EC4899"
                    }
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  />

                  {/* Connection node at card */}
                  <motion.circle
                    cx={`${cardX}%`}
                    cy={`${cardY}%`}
                    r="5"
                    fill={
                      channel.color.includes("blue")
                        ? "#3B82F6"
                        : channel.color.includes("green")
                        ? "#10B981"
                        : channel.color.includes("purple")
                        ? "#8B5CF6"
                        : "#EC4899"
                    }
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1 + index * 0.4,
                    }}
                  />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          channel.color.includes("blue")
                            ? "#3B82F6"
                            : channel.color.includes("green")
                            ? "#10B981"
                            : channel.color.includes("purple")
                            ? "#8B5CF6"
                            : "#EC4899"
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          channel.color.includes("blue")
                            ? "#1D4ED8"
                            : channel.color.includes("green")
                            ? "#059669"
                            : channel.color.includes("purple")
                            ? "#7C3AED"
                            : "#DB2777"
                        }
                      />
                    </linearGradient>
                  </defs>
                </svg>
              );
            })}
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
