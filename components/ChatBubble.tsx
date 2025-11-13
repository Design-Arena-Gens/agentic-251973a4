import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xl rounded-3xl px-5 py-3 text-sm leading-6 shadow-lg backdrop-blur border border-white/5 ${
          isUser
            ? "bg-accent-soft/90 text-slate-100"
            : "bg-slate-900/70 text-slate-100"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
        </p>
        <span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-slate-400">
          {isUser ? "You" : "Lumos"} • {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}
