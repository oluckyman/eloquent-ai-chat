import type { AgentClient, Message } from "./types";

export class HttpAgentClient implements AgentClient {
  constructor(private url: string) {}

  async send(history: Message[]): Promise<string> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role, content: m.text })),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Agent HTTP ${res.status}: ${text}`);
    }

    const data = (await res.json()) as { reply?: string };
    if (!data.reply) throw new Error('Agent response missing "reply" field');
    return data.reply;
  }
}
