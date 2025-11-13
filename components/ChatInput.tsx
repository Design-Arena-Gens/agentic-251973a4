"use client";

import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (content: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      await onSend(trimmed);
      setValue("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative flex items-end rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur px-4 py-3 shadow-2xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask Lumos anything about your coursework, study strategies, or planning."
        className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-400"
        rows={2}
        disabled={disabled || isSubmitting}
      />
      <motion.button
        type="submit"
        className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-slate-900 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:bg-slate-600"
        whileTap={{ scale: 0.95 }}
        disabled={disabled || isSubmitting}
      >
        <PaperAirplaneIcon className="h-4 w-4" />
      </motion.button>
    </motion.form>
  );
}
