import { StudyPlanItem } from "@/lib/types";
import { CalendarIcon, CheckCircleIcon, PlayIcon } from "@heroicons/react/24/solid";

interface StudyPlannerProps {
  plan: StudyPlanItem[];
}

const statusStyles: Record<StudyPlanItem["status"], string> = {
  pending: "bg-slate-900/60 border-white/10",
  "in-progress": "bg-amber-500/10 border-amber-400/30",
  done: "bg-emerald-500/10 border-emerald-400/30",
};

const statusLabels: Record<StudyPlanItem["status"], string> = {
  pending: "Queued",
  "in-progress": "In Progress",
  done: "Completed",
};

const statusIcons: Record<StudyPlanItem["status"], typeof PlayIcon> = {
  pending: PlayIcon,
  "in-progress": PlayIcon,
  done: CheckCircleIcon,
};

export function StudyPlanner({ plan }: StudyPlannerProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Study roadmap</h2>
          <p className="text-sm text-slate-400">
            Designed with spaced repetition and energy-aware pacing.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          <CalendarIcon className="h-4 w-4 text-accent" />
          Updated daily
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {plan.map((item) => {
          const Icon = statusIcons[item.status];
          return (
            <li
              key={item.id}
              className={`rounded-2xl border px-4 py-3 text-sm text-slate-300 ${statusStyles[item.status]}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  <Icon className="h-4 w-4 text-accent" />
                  {statusLabels[item.status]}
                </span>
                <span className="text-slate-200">{item.title}</span>
                <span className="ml-auto rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-400">
                  {item.durationMinutes} min
                </span>
              </div>
              <p className="mt-3 text-slate-400">{item.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="rounded-full bg-slate-800/80 px-3 py-1">Due {item.due}</span>
                <span className="rounded-full bg-slate-800/80 px-3 py-1">Energy budget: {item.status === "in-progress" ? "moderate" : "light"}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
