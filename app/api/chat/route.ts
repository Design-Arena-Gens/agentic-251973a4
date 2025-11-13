import { NextRequest } from "next/server";
import { getOpenAIClient, studentSystemPrompt } from "@/lib/openai";
import type { Role } from "@/lib/types";

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

export const runtime = "edge";

interface RequestMessage {
  role: Role;
  content: string;
}

export async function POST(req: NextRequest) {
  const client = getOpenAIClient();

  if (!client) {
    return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const body = await req.json();
  const { messages } = body as { messages?: RequestMessage[] };

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.6,
      presence_penalty: 0.2,
      frequency_penalty: 0.1,
      messages: [
        { role: "system", content: studentSystemPrompt },
        ...messages.map(({ role, content }) => ({ role, content })),
      ],
    });

    const assistantMessage = completion.choices[0]?.message?.content ??
      "I'm sorry, I couldn't generate a response. Please try again.";

    return new Response(
      JSON.stringify({ role: "assistant", content: assistantMessage }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat route error", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
