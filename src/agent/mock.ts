import { AgentClient, Message } from "./types";

export class MockAgentClient implements AgentClient {
  constructor(private delayMs: number = 600) {}

  async send(history: Message[]): Promise<string> {
    const text = history.findLast((m) => m.role === "user")?.text ?? "";
    await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    return text ? `You said: ${text}` : "Didn't quite get it";
  }
}
