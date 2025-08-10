export type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export interface AgentClient {
  send(history: Message[]): Promise<string>;
}
