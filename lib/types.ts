export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface StudyPlanItem {
  id: string;
  title: string;
  description: string;
  due: string;
  durationMinutes: number;
  status: "pending" | "in-progress" | "done";
}
