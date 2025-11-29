"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOT_AVATAR = (
  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#08243A] shadow-lg ring-2 ring-[#08243A]/40 overflow-hidden">
    <img
      src="/img/Ai-icon.png"
      alt="AI Bot"
      className="w-full h-full object-contain p-1"
    />
  </div>
);
const USER_AVATAR = (
  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#08243A] shadow-lg ring-2 ring-[#08243A]/40 text-white font-bold text-lg">
    🧑
  </span>
);

const TYPING_DELAY = 1200; // ms

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 ml-2">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.2s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.1s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
      <span className="text-xs text-white ml-2">Typing...</span>
    </div>
  );
}

// Website info context
const websiteInfo = {
  about: `AR Solutions is a multi-service creative and commercial agency committed to delivering advertising, branding, printing, media production, and business solutions — all under one roof. We combine innovative ideas with practical execution, helping our clients grow, connect, and stand out in today’s competitive world.`,
  services: [
    "Advertising & Printing: Banners, stickers, office & vehicle branding, merchandise",
    "Digital Marketing: Social media management, paid ads, SEO, strategy, influencer marketing",
    "Branding & Design: Logo, brand identity, strategy, visual content",
    "Media Production: Videography, photography, promotional content",
    "Web Development: Website design, development, maintenance, SEO optimization",
    "Event Planning: Corporate events, launches, conferences, exhibitions",
    "Training: Corporate, personal development, and media trainings (meeting rooms or offsite)",
  ],
  stats: [
    "50+ Projects Completed",
    "98% Client Satisfaction",
    "10+ Happy Clients",
    "3+ Years Experience",
  ],
  contact: {
    email: "artradingplc@gmail.com",
    phone: "0988175550",
    address: "9th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia",
  },
  clients:
    "Our customer base ranges from small startups to big governmental firms.",
  mission:
    "We exist to elevate brands, simplify solutions, and deliver quality with heart.",
  team: "Our team includes experts in strategy, design, development, and marketing, dedicated to delivering digital excellence.",
  testimonials:
    "Our clients praise us for our professionalism, creativity, and results. Check the Testimonials section on our website for more!",
};

const FAQS = [
  { q: "What services do you offer?" },
  { q: "Where are you located?" },
  { q: "How can I contact you?" },
  { q: "Tell me about AR Solutions." },
  { q: "Who are your clients?" },
  { q: "What is your mission?" },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatStateRef = useRef({ open, fullScreen });

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (showPopup && !open && !fullScreen) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, open, fullScreen]);

  // Update ref when state changes
  useEffect(() => {
    chatStateRef.current = { open, fullScreen };
  }, [open, fullScreen]);

  // Show popup at intervals (5-10 minutes)
  useEffect(() => {
    if (open || fullScreen) return;

    let timer: NodeJS.Timeout | null = null;

    const scheduleNextPopup = () => {
      // Clear any existing timer
      if (timer) clearTimeout(timer);

      // Random time between 5-10 minutes (300000ms to 600000ms)
      const interval = 300000 + Math.random() * 300000;

      timer = setTimeout(() => {
        // Check if chat is still closed using ref
        if (!chatStateRef.current.open && !chatStateRef.current.fullScreen) {
          setShowPopup(true);
          // Schedule next popup
          scheduleNextPopup();
        }
      }, interval);
    };

    // Initial delay before first popup (5-10 minutes)
    scheduleNextPopup();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, fullScreen]);

  useEffect(() => {
    if ((open || fullScreen) && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, botTyping, fullScreen]);

  const handleSend = () => {
    if (!input.trim() || botTyping) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setBotTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: getBotResponse(input),
        },
      ]);
      setBotTyping(false);
    }, TYPING_DELAY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  function getBotResponse(userInput: string) {
    const lower = userInput.toLowerCase();
    // About/company
    if (
      lower.includes("about") ||
      lower.includes("what is ar trading") ||
      lower.includes("company")
    )
      return websiteInfo.about;
    // Services
    if (
      lower.includes("service") ||
      lower.includes("offer") ||
      lower.includes("do you do") ||
      lower.includes("provide")
    )
      return `We offer the following services:\n- ${websiteInfo.services.join(
        "\n- "
      )}`;
    // Location
    if (
      lower.includes("location") ||
      lower.includes("where are you") ||
      lower.includes("address")
    )
      return `Our address is: ${websiteInfo.contact.address}`;
    // Contact
    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("phone") ||
      lower.includes("call")
    )
      return `You can contact us at ${websiteInfo.contact.email} or call ${websiteInfo.contact.phone}.`;
    // Mission/vision
    if (
      lower.includes("mission") ||
      lower.includes("vision") ||
      lower.includes("goal")
    )
      return websiteInfo.mission;
    // Clients
    if (
      lower.includes("client") ||
      lower.includes("customer base") ||
      lower.includes("who do you work with") ||
      lower.includes("who are your clients")
    )
      return websiteInfo.clients;
    // Team
    if (
      lower.includes("team") ||
      lower.includes("who works") ||
      lower.includes("staff")
    )
      return websiteInfo.team;
    // Testimonials
    if (
      lower.includes("testimonial") ||
      lower.includes("review") ||
      lower.includes("feedback")
    )
      return websiteInfo.testimonials;
    // Stats
    if (
      lower.includes("stat") ||
      lower.includes("project") ||
      lower.includes("satisfaction") ||
      lower.includes("experience") ||
      lower.includes("happy client")
    )
      return `Here are some of our stats:\n- ${websiteInfo.stats.join("\n- ")}`;
    // Greetings
    if (lower.includes("hello") || lower.includes("hi"))
      return "Hi there! 👋 How can I assist you today?";
    // Goodbye
    if (lower.includes("bye") || lower.includes("goodbye"))
      return "Goodbye! Have a great day!";
    // Fallback
    return "Thank you for your message! If you have questions about AR Solutions, our services, or how we can help your business, just ask! (This is a demo bot.)";
  }

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          : "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      }
    >
      {/* Floating Button */}
      <AnimatePresence>
        {!open && !fullScreen && (
          <div className="relative">
            {/* Chat Popup */}
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8, y: 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-50 hidden sm:block"
                  onMouseEnter={() => setShowPopup(true)}
                  onMouseLeave={() => setShowPopup(false)}
                >
                  <div className="relative bg-gradient-to-r from-[#C79D6D] to-[#d4a574] text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-sm font-semibold font-outfit">
                      Chat with me
                    </p>
                    {/* Arrow pointing to button */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#d4a574]"></div>
                    </div>
                    {/* Animated dots */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Mobile Popup - Above button */}
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 sm:hidden"
                >
                  <div className="relative bg-gradient-to-r from-[#C79D6D] to-[#d4a574] text-white px-3 py-2 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-xs font-semibold font-outfit">
                      Chat with me
                    </p>
                    {/* Arrow pointing down to button */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full">
                      <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#d4a574]"></div>
                    </div>
                    {/* Animated dots */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              key="chatbot-btn"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#08243A] text-white rounded-full shadow-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#08243A]/40 border-2 border-[#08243A]/30 animate-pulse cursor-pointer relative z-10"
              aria-label="Open chat bot"
              onClick={() => {
                setOpen(true);
                setShowPopup(false);
              }}
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => {
                // Delay hiding to allow moving to popup
                setTimeout(() => setShowPopup(false), 200);
              }}
              style={{ cursor: "pointer" }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="w-14 h-14 sm:w-16 sm:h-16"
              >
                <img
                  src="/img/Ai-icon.png"
                  alt="AI Chatbot"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
      {/* Chat Window */}
      <AnimatePresence>
        {(open || fullScreen) && (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={
              (fullScreen
                ? "w-full h-full max-w-none max-h-none rounded-none flex flex-col"
                : "w-[95vw] max-w-xs sm:w-[420px] sm:max-w-[98vw] h-[70vh] sm:h-[520px] flex flex-col rounded-3xl") +
              " bg-[#08243A] border border-[#08243A]/30 shadow-2xl backdrop-blur-xl overflow-hidden"
            }
            style={{
              boxShadow: fullScreen
                ? "0 0 0 9999px rgba(31,38,135,0.15)"
                : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#08243A]/80 border-b border-[#08243A]/30 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-wide drop-shadow">
                  AR ChatBot
                </span>
                <span className="ml-2 text-xs text-white bg-[#08243A]/40 px-2 py-0.5 rounded-full animate-pulse">
                  ● Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-white hover:text-gray-200 text-xl focus:outline-none transition-colors cursor-pointer"
                  aria-label={
                    fullScreen ? "Minimize chat bot" : "Full screen chat bot"
                  }
                  onClick={() => setFullScreen((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  {fullScreen ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M9 21H3v-6" />
                      <path d="M21 3l-7.5 7.5" />
                      <path d="M3 21l7.5-7.5" />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 3H3v5" />
                      <path d="M16 21h5v-5" />
                      <path d="M3 3l7.5 7.5" />
                      <path d="M21 21l-7.5-7.5" />
                    </svg>
                  )}
                </button>
                <button
                  className="text-white hover:text-gray-200 text-2xl focus:outline-none transition-colors cursor-pointer"
                  aria-label="Close chat bot"
                  onClick={() => {
                    setOpen(false);
                    setFullScreen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-[#08243A]/20 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {/* Friendly intro */}
              {messages.length === 1 && (
                <div className="flex gap-2 text-white text-sm mb-2 items-start">
                  <div className="pt-1">{BOT_AVATAR}</div>
                  <span className="leading-5 pt-0.5">
                    I can answer questions about our services, team, contact
                    info, and more. Try the quick questions below or ask
                    anything!
                  </span>
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.from === "bot" && BOT_AVATAR}
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-lg backdrop-blur-md ${
                      msg.from === "bot"
                        ? "bg-white/10 text-white ml-2 border border-white/20"
                        : "bg-[#08243A]/80 text-white mr-2 border border-[#08243A]/40"
                    }`}
                    style={{ cursor: "default" }}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "user" && USER_AVATAR}
                </motion.div>
              ))}
              {botTyping && (
                <div className="flex items-center justify-start">
                  {BOT_AVATAR}
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* FAQ Quick Buttons above Input */}
            <div className="px-4 py-4 bg-[#08243A]/10 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    className="bg-white/15 text-white text-sm px-3 py-2.5 rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-200 cursor-pointer hover:scale-105 text-center"
                    onClick={() => {
                      setInput(faq.q);
                      setTimeout(handleSend, 100);
                    }}
                    disabled={botTyping}
                    style={{ cursor: botTyping ? "not-allowed" : "pointer" }}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>
            {/* Input */}
            <div className="px-3 py-3 bg-[#08243A]/60 border-t border-white/20 flex items-center gap-2 backdrop-blur-md">
              <input
                type="text"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-inner backdrop-blur-md"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Type your message"
                disabled={botTyping}
                autoComplete="off"
                style={{ cursor: botTyping ? "not-allowed" : "text" }}
              />
              <motion.button
                className="shrink-0 bg-white/20 text-white rounded-xl px-4 py-2 font-semibold shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/30 cursor-pointer"
                onClick={handleSend}
                disabled={!input.trim() || botTyping}
                aria-label="Send message"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: !input.trim() || botTyping ? 1 : 1.1 }}
                style={{
                  cursor:
                    !input.trim() || botTyping ? "not-allowed" : "pointer",
                }}
              >
                <span className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  Send
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
