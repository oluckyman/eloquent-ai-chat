import { useState, type FC } from "react";
import "./styles/base.css";

export type Theme = {
  font?: string;
  primary?: string;
  primaryHover?: string;
  bg?: string;
  text?: string;
  radius?: string;
  shadow?: string;
};
export type EloquentChatProps = {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  theme?: Theme;
};

export const EloquentChat: FC<EloquentChatProps> = ({
  title = "Eloquent Chat",
  open,
  defaultOpen = true,
  onToggle,
  theme,
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

  // Theme tokens override
  const varStyle: Record<string, string> = {};
  if (theme) {
    const toKebabCase = (str: string) => str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    Object.entries(theme)
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => (varStyle[`--eqt-${toKebabCase(key)}`] = value));
  }

  return (
    <div className="eqt-root" style={varStyle}>
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
