"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";

type ChatMessage = { from: "bot" | "user"; text: string };

type ChatBotContextValue = {
  open: boolean;
  minimized: boolean;
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
};

const ChatBotContext = createContext<ChatBotContextValue | null>(null);

export function useChatBot() {
  const ctx = useContext(ChatBotContext);
  if (!ctx) {
    throw new Error("useChatBot must be used within ChatBotProvider");
  }
  return ctx;
}

const BOT_AVATAR = (
  <div className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#08243A] shadow-lg ring-2 ring-[#08243A]/40">
    <Image
      src="/img/Ai-icon.png"
      alt="AI Bot"
      width={48}
      height={48}
      className="h-full w-full object-contain p-1"
    />
  </div>
);

const USER_AVATAR = (
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#08243A] text-lg font-bold text-white shadow-lg ring-2 ring-[#08243A]/40">
    🧑
  </span>
);

const TYPING_DELAY = 1200;

const websiteInfo = {
  about: `Addis Reality is a multi-service creative and commercial agency committed to delivering advertising, branding, printing, media production, and business solutions all under one roof. We combine innovative ideas with practical execution, helping our clients grow, connect, and stand out in today's competitive world.`,
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
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phoneDisplay,
    address: siteConfig.contact.fullAddress,
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
  { q: "Tell me about Addis Reality." },
  { q: "Who are your clients?" },
  { q: "What is your mission?" },
];

function TypingIndicator() {
  return (
    <div className="ml-2 flex items-center gap-2">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
      <span className="ml-2 text-xs text-white">Typing...</span>
    </div>
  );
}

function getBotResponse(userInput: string) {
  const lower = userInput.toLowerCase();
  if (
    lower.includes("about") ||
    lower.includes("what is addis reality") ||
    lower.includes("what is ar trading") ||
    lower.includes("company")
  )
    return websiteInfo.about;
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("do you do") ||
    lower.includes("provide")
  )
    return `We offer the following services:\n- ${websiteInfo.services.join("\n- ")}`;
  if (
    lower.includes("location") ||
    lower.includes("where are you") ||
    lower.includes("address")
  )
    return `Our address is: ${websiteInfo.contact.address}`;
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("phone") ||
    lower.includes("call")
  )
    return `You can contact us at ${websiteInfo.contact.email} or call ${websiteInfo.contact.phone}.`;
  if (
    lower.includes("mission") ||
    lower.includes("vision") ||
    lower.includes("goal")
  )
    return websiteInfo.mission;
  if (
    lower.includes("client") ||
    lower.includes("customer base") ||
    lower.includes("who do you work with") ||
    lower.includes("who are your clients")
  )
    return websiteInfo.clients;
  if (
    lower.includes("team") ||
    lower.includes("who works") ||
    lower.includes("staff")
  )
    return websiteInfo.team;
  if (
    lower.includes("testimonial") ||
    lower.includes("review") ||
    lower.includes("feedback")
  )
    return websiteInfo.testimonials;
  if (
    lower.includes("stat") ||
    lower.includes("project") ||
    lower.includes("satisfaction") ||
    lower.includes("experience") ||
    lower.includes("happy client")
  )
    return `Here are some of our stats:\n- ${websiteInfo.stats.join("\n- ")}`;
  if (lower.includes("hello") || lower.includes("hi"))
    return "Hi there! 👋 How can I assist you today?";
  if (lower.includes("bye") || lower.includes("goodbye"))
    return "Goodbye! Have a great day!";
  return "Thank you for your message! If you have questions about Addis Reality, our services, or how we can help your business, just ask! (This is a demo bot.)";
}

function MacTrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  maximized,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
}) {
  return (
    <div className="mac-traffic-lights group flex items-center gap-2">
      <button
        type="button"
        className="mac-dot mac-dot--close"
        aria-label="Close"
        onClick={onClose}
      />
      <button
        type="button"
        className="mac-dot mac-dot--minimize"
        aria-label="Minimize"
        onClick={onMinimize}
      />
      <button
        type="button"
        className="mac-dot mac-dot--maximize"
        aria-label={maximized ? "Exit full screen" : "Full screen"}
        onClick={onMaximize}
      />
    </div>
  );
}

function ChatBotWindow({
  open,
  minimized,
  onClose,
  onMinimize,
}: {
  open: boolean;
  minimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
}) {
  const [fullScreen, setFullScreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visible = open && !minimized;

  useEffect(() => {
    if (visible && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, botTyping, visible]);

  const handleSend = useCallback(() => {
    if (!input.trim() || botTyping) return;
    const userText = input;
    setMessages((msgs) => [...msgs, { from: "user", text: userText }]);
    setInput("");
    setBotTyping(true);
    window.setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: getBotResponse(userText) },
      ]);
      setBotTyping(false);
    }, TYPING_DELAY);
  }, [input, botTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleClose = () => {
    setFullScreen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {fullScreen && (
            <motion.div
              key="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[68] bg-black/40 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden
            />
          )}

          <motion.div
            key="chatbot-window"
            role="dialog"
            aria-label="Addis Reality chat"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={
              fullScreen
                ? "mac-chat-window fixed inset-4 z-[70] flex flex-col sm:inset-8"
                : "mac-chat-window fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-1/2 z-[70] flex h-[min(520px,calc(100vh-8rem))] w-[min(420px,calc(100vw-1.5rem))] -translate-x-1/2 flex-col sm:bottom-[6.25rem] lg:h-[min(720px,calc(100vh-11rem))] lg:w-[min(600px,calc(100vw-2rem))]"
            }
          >
            <div className="mac-titlebar flex shrink-0 items-center gap-3 border-b border-black/10 px-4 py-3">
              <MacTrafficLights
                onClose={handleClose}
                onMinimize={onMinimize}
                onMaximize={() => setFullScreen((v) => !v)}
                maximized={fullScreen}
              />
              <div className="flex min-w-0 flex-1 items-center justify-center gap-2 pr-16">
                <Image
                  src="/img/Ai-icon.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                <span className="truncate text-sm font-semibold text-[#3d3d3d]">
                  Addis Reality Assistant
                </span>
              </div>
              <span className="absolute right-4 hidden text-[10px] font-medium uppercase tracking-wider text-emerald-600 sm:inline">
                ● Online
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col bg-[#1a2f42]">
              <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {messages.length === 1 && (
                  <div className="mb-2 flex items-start gap-2 text-sm text-white">
                    <div className="pt-1">{BOT_AVATAR}</div>
                    <span className="pt-0.5 leading-5">
                      I can answer questions about our services, team, contact
                      info, and more. Try the quick questions below or ask
                      anything!
                    </span>
                  </div>
                )}
                {messages.map((msg) => (
                  <motion.div
                    key={`${msg.from}-${msg.text.slice(0, 24)}-${msg.text.length}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from === "bot" && BOT_AVATAR}
                    <div
                      className={`max-w-[70%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm shadow-lg backdrop-blur-md ${
                        msg.from === "bot"
                          ? "ml-2 border border-white/20 bg-white/10 text-white"
                          : "mr-2 border border-[#08243A]/40 bg-[#08243A]/80 text-white"
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

              <div className="border-t border-white/10 bg-[#08243A]/10 px-4 py-3">
                <div className="grid grid-cols-2 gap-2">
                  {FAQS.map((faq) => (
                    <button
                      key={faq.q}
                      type="button"
                      className="rounded-lg border border-white/25 bg-white/15 px-3 py-2.5 text-center text-sm text-white transition-all hover:scale-105 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => {
                        if (botTyping) return;
                        setInput(faq.q);
                        window.setTimeout(() => {
                          const userText = faq.q;
                          setMessages((msgs) => [
                            ...msgs,
                            { from: "user", text: userText },
                          ]);
                          setBotTyping(true);
                          window.setTimeout(() => {
                            setMessages((msgs) => [
                              ...msgs,
                              { from: "bot", text: getBotResponse(userText) },
                            ]);
                            setBotTyping(false);
                          }, TYPING_DELAY);
                        }, 50);
                      }}
                      disabled={botTyping}
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-white/20 bg-[#08243A]/60 px-3 py-3 backdrop-blur-md">
                <input
                  type="text"
                  className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white shadow-inner outline-none placeholder:text-white/70 focus:ring-2 focus:ring-white/40"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Type your message"
                  disabled={botTyping}
                  autoComplete="off"
                />
                <motion.button
                  type="button"
                  className="shrink-0 rounded-xl border border-white/30 bg-white/20 px-4 py-2 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSend}
                  disabled={!input.trim() || botTyping}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: !input.trim() || botTyping ? 1 : 1.05 }}
                  aria-label="Send message"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ChatBotProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const openChat = useCallback(() => {
    setMinimized(false);
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    setMinimized(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setMinimized(true);
  }, []);

  return (
    <ChatBotContext.Provider
      value={{ open, minimized, openChat, closeChat, minimizeChat }}
    >
      {children}
      <ChatBotWindow
        open={open}
        minimized={minimized}
        onClose={closeChat}
        onMinimize={minimizeChat}
      />
    </ChatBotContext.Provider>
  );
}

/** @deprecated Use ChatBotProvider + dock chat icon instead */
export default function ChatBot() {
  return null;
}
