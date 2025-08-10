import { type FormEvent, useEffect, useRef, useState } from "react";
import { Logo } from "./ui/Logo";
import { ChevronDown } from "./ui/ChevronDown";
import type { AgentClient, Message } from "./agent/types";
import { MockAgentClient } from "./agent/mock";
import { HttpAgentClient } from "./agent/http";
import "./styles/base.css";

export type Theme = {
  font?: string;
  primary?: string;
  primaryHover?: string;
  bg?: string;
  bgSecondary?: string;
  text?: string;
  textSecondary?: string;
  radius?: string;
  shadow?: string;
  zIndex?: string;
  // add more --eqt-* vars from .eqt-root in base.css if needed
};
type Status = "online" | "offline";
export type EloquentChatProps = {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  theme?: Theme;
  initialMessages?: Message[];
  status?: Status;
  maintenance?: boolean;
  maintenanceMessage?: string;
  agentUrl?: string;
};

export function EloquentChat({
  title = "Eloquent AI",
  open,
  defaultOpen = true,
  onToggle,
  theme,
  initialMessages = [],
  status = "online",
  maintenance = false,
  maintenanceMessage = "We're down for maintenance",
  agentUrl,
}: EloquentChatProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const statusOrMaintenece: Status = maintenance ? "offline" : status; // go offline when on maintenance

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
  const agentRef = useRef<AgentClient>(agentUrl ? new HttpAgentClient(agentUrl) : new MockAgentClient(2000));

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (waiting || maintenance) return;

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
        .catch((err) => {
          setMessages((curr) => [
            ...curr,
            {
              id: `e_${Date.now()}`,
              role: "assistant",
              text: "Sorry, something went wrong. Please try again.",
            },
          ]);
          console.warn("Agent failed:", err);
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
            <span className={`eqt-status eqt-status--${statusOrMaintenece}`}>● {statusOrMaintenece}</span>
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

          {maintenance && <div className="eqt-maintenance">{maintenanceMessage}</div>}
          <form className={`eqt-inputRow ${maintenance ? "eqt-inputRow--maintenance" : ""}`} onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              autoFocus
              autoComplete="off"
              disabled={maintenance}
            />
            <button className="eqt-send" type="submit" disabled={input.trim().length === 0 || waiting || maintenance}>
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
