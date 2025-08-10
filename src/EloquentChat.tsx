import { type FormEvent, useEffect, useRef, useState } from "react";
import { Logo } from "./ui/Logo";
import { ChevronDown } from "./ui/ChevronDown";
import type { AgentClient, Message } from "./agent/types";
import { MockAgentClient } from "./agent/mock";
import "./styles/base.css";

export type Theme = {
  font?: string;
  primary?: string;
  primaryHover?: string;
  bg?: string;
  text?: string;
  radius?: string;
  shadow?: string;
  zIndex?: string;
};
export type EloquentChatProps = {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  theme?: Theme;
  initialMessages?: Message[];
};

export function EloquentChat({
  title = "Eloquent AI",
  open,
  defaultOpen = true,
  onToggle,
  theme,
  initialMessages = [],
}: EloquentChatProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);

  // Open / Close logic
  //
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = (v: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(v);
    }
    onToggle?.(v);
  };

  // Theme tokens override
  //
  const varStyle: Record<string, string> = {};
  if (theme) {
    const toKebabCase = (str: string) => str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    Object.entries(theme)
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => (varStyle[`--eqt-${toKebabCase(key)}`] = value));
  }

  // Messaging
  //
  const agentRef = useRef<AgentClient>(new MockAgentClient(2000));

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (waiting) return;

    const text = input.trim();
    if (!text) return;

    const now = Date.now();
    const userMessage: Message = { id: `u_${now}`, role: "user", text };

    setMessages((prevHistory) => {
      const nextHistory = [...prevHistory, userMessage];
      setWaiting(true);
      agentRef.current
        .send(nextHistory)
        .then((replyText) => {
          setMessages((curr) => [...curr, { id: `a_${Date.now()}`, role: "assistant", text: replyText }]);
        })
        .catch(() => {
          // (errors later; skip for now)
        })
        .finally(() => {
          setWaiting(false);
        });

      return nextHistory;
    });

    setInput("");
  };

  // Auto-scroll
  //
  const messagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    const rAF = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });

    return () => cancelAnimationFrame(rAF);
  }, [messages.length, waiting]);

  return (
    <div className={`eqt-root ${isOpen ? "is-open" : ""}`} style={varStyle}>
      {isOpen && (
        <div className="eqt-panel">
          <div className="eqt-header">
            <Logo className="eqt-logo" />
            <div className="eqt-title">{title}</div>
            <button className="eqt-close" type="button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="eqt-messages" ref={messagesRef}>
            {messages.length === 0 ? (
              <div className="eqt-placeholder">Ask me anything! ✨</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`eqt-row eqt-row--${m.role}`}>
                  {m.role === "assistant" && (
                    <div className="eqt-avatar">
                      <Logo />
                    </div>
                  )}
                  <div className={`eqt-bubble eqt-bubble--${m.role}`}>{m.text}</div>
                </div>
              ))
            )}
            {waiting && (
              <div className="eqt-row eqt-row--assistant">
                <div className="eqt-avatar">
                  <Logo />
                </div>
                <div className="eqt-bubble eqt-bubble--assistant">Thinking…</div>
              </div>
            )}
          </div>
          <form className="eqt-inputRow" onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              autoFocus
              autoComplete="off"
            />
            <button className="eqt-send" type="submit" disabled={input.trim().length === 0 || waiting}>
              {waiting ? "…" : "↑"}
            </button>
          </form>
        </div>
      )}
      <button
        className="eqt-launcher eqt-button"
        type="button"
        title={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown /> : <Logo />}
      </button>
    </div>
  );
}
