import { useCallback, useEffect, useRef, useState } from "react";
import type { AgentClient, Message } from "../agent/types";
import { MockAgentClient } from "../agent/mock";
import { HttpAgentClient } from "../agent/http";

export type UseChatAgentOpts = {
  agentUrl?: string;
  initialMessages?: Message[];
};

export function useChatAgent({ agentUrl, initialMessages = [] }: UseChatAgentOpts) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [waiting, setWaiting] = useState(false);

  const clientRef = useRef<AgentClient>(agentUrl ? new HttpAgentClient(agentUrl) : new MockAgentClient());
  useEffect(() => {
    clientRef.current = agentUrl ? new HttpAgentClient(agentUrl) : new MockAgentClient();
  }, [agentUrl]);

  const send = useCallback((text: string) => {
    const now = Date.now();
    const userMsg: Message = { id: `u_${now}`, role: "user", text };
    setMessages((prev) => {
      return [...prev, userMsg];
    });
  }, []);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== "user") return;
    setWaiting(true);
    clientRef.current
      .send(messages)
      .then((replyText) => {
        const ts = Date.now();
        const assistantMsg: Message = { id: `a_${ts}`, role: "assistant", text: replyText };
        setMessages((prev) => [...prev, assistantMsg]);
        setWaiting(false);
      })
      .catch(() => {
        const ts = Date.now();
        setMessages((prev) => [
          ...prev,
          { id: `a_${ts}`, role: "assistant", text: "Sorry, there was an error. Please try again." },
        ]);
      })
      .finally(() => {
        setWaiting(false);
      });
  }, [messages.length]);

  return { messages, waiting, send, setMessages };
}
