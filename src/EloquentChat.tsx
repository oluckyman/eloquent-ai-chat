import * as React from "react";

export type EloquentChatProps = { title?: string };

export const EloquentChat: React.FC<EloquentChatProps> = ({ title = "Eloquent Chat" }) => {
  return <div aria-label="Chat widget">{title}</div>;
};
