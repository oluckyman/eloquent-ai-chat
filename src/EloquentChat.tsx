import { type FormEvent, useState } from "react";
import { Logo } from "./ui/Logo";
import { ChevronDown } from "./ui/ChevronDown";
import "./styles/base.css";

type Message = { id: string; role: "user" | "assistant"; text: string };

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
};

export function EloquentChat({ title = "Eloquent AI", open, defaultOpen = true, onToggle, theme }: EloquentChatProps) {
  // Open / Close logic
  //
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const now = Date.now();
    const userMessage: Message = { id: `u_${now}`, role: "user", text };
    setMessages((m) => [...m, userMessage]);
    setInput("");
  };

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
          <div className="eqt-messages">
            {messages.length === 0 ? (
              <div className="eqt-placeholder">Ask me anything! ✨</div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`eqt-message eqt-role-${message.role}`}>
                  {message.role}: {message.text}
                </div>
              ))
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
            <button type="submit">↑</button>
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
