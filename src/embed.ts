import * as React from "react";
import { createRoot } from "react-dom/client";
import { EloquentChat } from "./EloquentChat";

export type InitOptions = { title?: string };
export type Handle = { open: () => void; close: () => void; destroy: () => void };

export function init(opts: InitOptions = {}): Handle {
  const container = document.createElement("div");
  container.id = "eloquent-chat-container";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(React.createElement(EloquentChat, { title: opts.title }));

  return {
    open: () => {},
    close: () => {},
    destroy: () => {
      root.unmount();
      container.remove();
    },
  };
}
