import { useEffect, useRef } from "react";
import { Logo } from "./Logo";
import type { Message } from "../agent/types";

type MessageListProps = { messages: Message[]; waiting: boolean };

export function MessageList({ messages, waiting }: MessageListProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  //
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, waiting]);

  return (
    <div className="eqt-messages" ref={ref}>
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
  );
}
