import { AcademicCapIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";

const highlights = [
  {
    title: "Active Recall Coach",
    description:
      "Generate personalised quizzes, memory palaces, or flashcards for anything you're learning.",
    icon: AcademicCapIcon,
  },
  {
    title: "Smart Scheduling",
    description:
      "Balance deep work, breaks, and review sessions with flexible templates tailored to your week.",
    icon: ClockIcon,
  },
  {
    title: "Energy Check-ins",
    description:
      "Track how you feel before and after studying so Lumos can adjust pacing and techniques.",
    icon: SparklesIcon,
  },
];

export function FocusModeCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl">
      <h2 className="text-lg font-semibold text-slate-100">Why students love Lumos</h2>
      <p className="mt-1 text-sm text-slate-400">
        Build momentum with gentle accountability, evidence-based techniques, and a study partner who adapts to your learning style.
      </p>
      <ul className="mt-5 space-y-4 text-sm text-slate-300">
        {highlights.map((highlight) => (
          <li key={highlight.title} className="flex gap-3">
            <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
              <highlight.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-slate-100">{highlight.title}</p>
              <p className="text-slate-400">{highlight.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
