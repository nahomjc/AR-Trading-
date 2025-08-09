"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOT_AVATAR = (
  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 shadow-lg ring-2 ring-cyan-400/40 text-white font-bold text-lg">
    🤖
  </span>
);
const USER_AVATAR = (
  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg ring-2 ring-blue-400/40 text-white font-bold text-lg">
    🧑
  </span>
);

const TYPING_DELAY = 1200; // ms

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 ml-2">
      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-.2s]"></span>
      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-.1s]"></span>
      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
      <span className="text-xs text-cyan-300 ml-2">Typing...</span>
    </div>
  );
}

// Website info context
const websiteInfo = {
  about: `AR Trading PLC is a multi-service creative and commercial agency committed to delivering advertising, branding, printing, media production, and business solutions — all under one roof. We combine innovative ideas with practical execution, helping our clients grow, connect, and stand out in today’s competitive world.`,
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
    "500+ Projects Completed",
    "98% Client Satisfaction",
    "150+ Happy Clients",
    "5+ Years Experience",
  ],
  contact: {
    email: "artradingplc@gmail.com",
    phone: "0988175550",
    address: "8th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia",
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
  { q: "Tell me about AR Trading PLC." },
  { q: "Who are your clients?" },
  { q: "What is your mission?" },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    return "Thank you for your message! If you have questions about AR Trading PLC, our services, or how we can help your business, just ask! (This is a demo bot.)";
  }

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          : "fixed bottom-6 right-6 z-50"
      }
    >
      {/* Floating Button */}
      <AnimatePresence>
        {!open && !fullScreen && (
          <motion.button
            key="chatbot-btn"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 border-2 border-cyan-400/30 animate-pulse cursor-pointer"
            aria-label="Open chat bot"
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💬
            </motion.span>
          </motion.button>
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
                : "w-full max-w-xs sm:w-[420px] sm:max-w-[98vw] h-[80vh] sm:h-[520px] flex flex-col rounded-3xl") +
              " bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10 border border-cyan-400/30 shadow-2xl backdrop-blur-xl overflow-hidden"
            }
            style={{
              boxShadow: fullScreen
                ? "0 0 0 9999px rgba(31,38,135,0.15)"
                : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-br from-blue-800/20 via-purple-800/20 to-cyan-800/20 border-b border-cyan-400/30 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-200 tracking-wide drop-shadow">
                  AR ChatBot
                </span>
                <span className="ml-2 text-xs text-cyan-200 bg-cyan-800/20 px-2 py-0.5 rounded-full animate-pulse">
                  ● Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-cyan-300 hover:text-white text-xl focus:outline-none transition-colors cursor-pointer"
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
                  className="text-cyan-300 hover:text-white text-2xl focus:outline-none transition-colors cursor-pointer"
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
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-cyan-700/40 scrollbar-track-transparent">
              {/* Friendly intro */}
              {messages.length === 1 && (
                <div className="flex gap-2 text-cyan-200 text-sm mb-2 items-start">
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
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-lg backdrop-blur-md border border-cyan-400/20 ${
                      msg.from === "bot"
                        ? "bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 text-white ml-2"
                        : "bg-gradient-to-br from-cyan-600/60 to-blue-700/60 text-white mr-2"
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
            <div className="flex flex-wrap gap-2 px-4 py-3 bg-transparent border-t border-cyan-400/10">
              {FAQS.map((faq, i) => (
                <button
                  key={i}
                  className="bg-gradient-to-br from-cyan-700/20 to-blue-700/20 text-cyan-200 text-xs px-3 py-1 rounded-full border border-cyan-400/20 hover:bg-cyan-700/30 transition-colors cursor-pointer"
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
            {/* Input */}
            <div className="px-3 py-3 bg-gradient-to-br from-blue-800/20 via-purple-800/20 to-cyan-800/20 border-t border-cyan-400/30 flex items-center gap-2 backdrop-blur-md">
              <input
                type="text"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-blue-900/10 text-white placeholder-cyan-400 border border-cyan-400/30 outline-none focus:ring-2 focus:ring-cyan-400/60 text-sm shadow-inner backdrop-blur-md"
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
                className="shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl px-4 py-2 font-semibold shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/60 border border-cyan-400/30 cursor-pointer"
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
