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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, botTyping]);

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
    // Expanded demo logic for AR Trading PLC
    const lower = userInput.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi"))
      return "Hi there! 👋 How can I assist you today?";
    if (lower.includes("service"))
      return "We offer web development, digital marketing, and branding services to help your business grow.";
    if (lower.includes("about") || lower.includes("what is ar trading"))
      return "AR Trading PLC is a leading digital marketing and technology solutions provider, serving clients from startups to large government firms.";
    if (
      lower.includes("location") ||
      lower.includes("where are you") ||
      lower.includes("address")
    )
      return "We are located at 3rd floor, Bass Addis Bldg. Bole, Addis Ababa, Ethiopia.";
    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("phone")
    )
      return "You can contact us at contact@artradingplc.com or call +251 911 227 098.";
    if (
      lower.includes("mission") ||
      lower.includes("vision") ||
      lower.includes("goal")
    )
      return "Our mission is to transform businesses through innovative digital marketing and technology solutions.";
    if (
      lower.includes("client") ||
      lower.includes("customer base") ||
      lower.includes("who do you work with")
    )
      return "Our customer base ranges from small startups to big governmental firms, including Ethiopian Airlines, Haile Hospitality Group, and more.";
    if (
      lower.includes("team") ||
      lower.includes("who works") ||
      lower.includes("staff")
    )
      return "Our team includes experts in strategy, design, development, and marketing, dedicated to delivering digital excellence.";
    if (
      lower.includes("testimonial") ||
      lower.includes("review") ||
      lower.includes("feedback")
    )
      return "Our clients praise us for our professionalism, creativity, and results. Check the Testimonials section on our website for more!";
    if (lower.includes("bye") || lower.includes("goodbye"))
      return "Goodbye! Have a great day!";
    return "Thank you for your message! If you have questions about AR Trading PLC, our services, or how we can help your business, just ask! (This is a demo bot.)";
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chatbot-btn"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 border-2 border-cyan-400/30 animate-pulse"
            aria-label="Open chat bot"
            onClick={() => setOpen(true)}
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
        {open && (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 max-w-[95vw] h-[440px] flex flex-col bg-gradient-to-br from-blue-950/90 via-cyan-900/90 to-purple-950/90 rounded-3xl shadow-2xl border border-cyan-400/20 backdrop-blur-xl overflow-hidden glassy-chatbot"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              border: "1.5px solid rgba(0,255,255,0.12)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-800/80 via-cyan-800/80 to-purple-800/80 border-b border-cyan-400/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-200 tracking-wide drop-shadow">
                  AR ChatBot
                </span>
                <span className="ml-2 text-xs text-cyan-200 bg-cyan-800/30 px-2 py-0.5 rounded-full animate-pulse">
                  ● Online
                </span>
              </div>
              <button
                className="text-cyan-300 hover:text-white text-2xl focus:outline-none transition-colors"
                aria-label="Close chat bot"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-cyan-700/40 scrollbar-track-transparent">
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
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-lg backdrop-blur-md border border-cyan-400/10 ${
                      msg.from === "bot"
                        ? "bg-gradient-to-br from-blue-900/80 via-cyan-900/80 to-purple-900/80 text-cyan-100 ml-2"
                        : "bg-gradient-to-br from-cyan-600/90 to-blue-700/90 text-white mr-2"
                    }`}
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
            {/* Input */}
            <div className="px-3 py-3 bg-gradient-to-r from-blue-900/80 via-cyan-900/80 to-purple-900/80 border-t border-cyan-400/10 flex items-center gap-2 backdrop-blur-md overflow-x-hidden">
              <input
                type="text"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-blue-950/60 text-cyan-100 placeholder-cyan-400 border-none outline-none focus:ring-2 focus:ring-cyan-400/60 text-sm shadow-inner backdrop-blur-md"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Type your message"
                disabled={botTyping}
                autoComplete="off"
              />
              <motion.button
                className="shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl px-4 py-2 font-semibold shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/60 border border-cyan-400/20"
                onClick={handleSend}
                disabled={!input.trim() || botTyping}
                aria-label="Send message"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: !input.trim() || botTyping ? 1 : 1.1 }}
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
