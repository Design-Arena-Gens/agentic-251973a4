"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { FocusModeCard } from "@/components/FocusModeCard";
import { StudyPlanner } from "@/components/StudyPlanner";
import type { ChatMessage, StudyPlanItem } from "@/lib/types";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const starterMessages: ChatMessage[] = [
  {
    id: uuid(),
    role: "assistant",
    content:
      "Hey, I'm Lumos. Tell me what you're studying this week and how you're feeling about it—I'll help you build a plan and stay on track.",
    createdAt: Date.now(),
  },
];

const defaultPlan: StudyPlanItem[] = [
  {
    id: "1",
    title: "Concept pulses: Newton's Laws",
    description: "15-minute whiteboard derivation + quickfire explain-it-back practice.",
    due: "Today 6:30 PM",
    durationMinutes: 25,
    status: "in-progress",
  },
  {
    id: "2",
    title: "Active recall deck",
    description: "Create 12 flashcards on friction & circular motion, review with spaced repetition.",
    due: "Tomorrow",
    durationMinutes: 30,
    status: "pending",
  },
  {
    id: "3",
    title: "Reflection & energy log",
    description: "Write 3 bullet takeaways and rate energy before/after to adjust next block.",
    due: "Tomorrow",
    durationMinutes: 15,
    status: "pending",
  },
  {
    id: "4",
    title: "Peer teaching session",
    description: "Schedule 20-minute call with lab partner and teach today's topic.",
    due: "Friday",
    durationMinutes: 20,
    status: "done",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  const studyPlan = useMemo(() => defaultPlan, []);

  const handleSend = async (content: string) => {
    const newMessage: ChatMessage = {
      id: uuid(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    const optimisticMessages = [...messages, newMessage];
    setMessages(optimisticMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: optimisticMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = (await response.json()) as { role: "assistant"; content: string };
      setMessages((current) => [
        ...current,
        {
          id: uuid(),
          role: data.role,
          content: data.content,
          createdAt: Date.now(),
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: uuid(),
          role: "assistant",
          content:
            "Hmm, I couldn't reach my study brain right now. Check your internet or API key, then try again!",
          createdAt: Date.now(),
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 pb-16 pt-12 md:flex-row md:gap-10 md:px-8">
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
      >
        <div className="mx-auto mt-20 h-[520px] w-[520px] rounded-full bg-accent/10" />
      </motion.div>

      <section className="flex-1 space-y-6">
        <header className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
              <AcademicCapIcon className="h-4 w-4 text-accent" />
              Student Flow
            </span>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50 md:text-4xl">
              Lumos keeps your study orbit on track
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              A lightweight workspace for planning deep work, practicing active recall, and keeping your energy balanced. Chat with Lumos to break down concepts, draft revision plans, and stay consistent.
            </p>
          </div>
        </header>

        <QuickActions onSelect={handleSend} disabled={isLoading} />

        <div className="relative flex h-[480px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl">
          <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-6 py-6" ref={containerRef}>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/60 px-4 py-2 text-xs text-slate-300">
                  <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
                  Lumos is thinking...
                </div>
              </motion.div>
            )}
          </div>
          <div className="border-t border-white/10 bg-slate-950/60 p-4">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </section>

      <aside className="flex w-full flex-col gap-6 md:w-80">
        <StudyPlanner plan={studyPlan} />
        <FocusModeCard />
      </aside>
    </main>
  );
}
