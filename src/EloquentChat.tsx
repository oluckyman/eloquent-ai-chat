import * as React from "react";

export type EloquentChatProps = {
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
};

export const EloquentChat: React.FC<EloquentChatProps> = ({
  title = "Eloquent Chat",
  open,
  defaultOpen = true,
  onToggle,
}) => {
  const isControlled = open !== undefined;

  const [isOpen, setIsOpen] = React.useState(open ?? defaultOpen);
  const setOpen = (v: boolean) => {
    setIsOpen(v);
    onToggle?.(v);
  };

  return (
    <>
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
    </>
  );
};
