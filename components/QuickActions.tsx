"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface QuickActionsProps {
  onSelect: (content: string) => Promise<void>;
  disabled?: boolean;
}

const suggestions = [
  {
    title: "Plan tonight's study session",
    prompt:
      "Help me design a 90-minute focused study session for calculus with active recall and short breaks.",
  },
  {
    title: "Explain a concept",
    prompt:
      "Explain the difference between mitosis and meiosis like I'm a visual learner and give a quick quiz.",
  },
  {
    title: "Build a revision plan",
    prompt:
      "Create a two-week revision plan for my history exam following spaced repetition principles.",
  },
];

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.title}
          onClick={() =>
            startTransition(async () => {
              if (disabled || isPending) return;
              await onSelect(suggestion.prompt);
            })
          }
          className="group flex h-full w-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-4 text-left shadow-lg transition hover:border-accent/60 hover:bg-slate-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          disabled={disabled || isPending}
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <SparklesIcon className="h-4 w-4 text-accent" />
            {suggestion.title}
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {suggestion.prompt}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
