import { useState, FC } from "react";
import "./styles/base.css";

export type EloquentChatProps = {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

export const EloquentChat: FC<EloquentChatProps> = ({
  title = "Eloquent Chat",
  open,
  defaultOpen = true,
  onToggle,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = (v: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(v);
    }
    onToggle?.(v);
  };

  return (
    <div className="eqt-root">
      {isOpen ? (
        <div className="eqt-panel">
          <div className="eqt-header">
            {title}
            <button className="eqt-close" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="eqt-messages">
            <div>Welcome! This is a stub. ✨</div>
          </div>
          <div className="eqt-inputRow">
            <input placeholder="Type a message…" />
          </div>
        </div>
      ) : (
        <div className="eqt-launcher eqt-button" onClick={() => setOpen(true)}>
          <span>💬</span>
        </div>
      )}
    </div>
  );
};
