import * as React from "react";
import { createRoot } from "react-dom/client";
import { type Theme, EloquentChat, EloquentChatProps } from "./EloquentChat";
// @ts-expect-error
import baseCss from "./styles/base.css"; // loaded as text via tsup loader

type InitOptions = {
  title?: string;
  defaultOpen?: boolean;
  theme?: Theme;
  zIndex?: number;
};

type Handle = {
  open: () => void;
  close: () => void;
  destroy: () => void;
};

export function init(options: InitOptions = {}): Handle {
  // 1) Host node in page DOM
  const host = document.createElement("div");
  host.id = "eloquent-chat-container";
  document.body.appendChild(host);

  // 2) Shadow DOM for isolation
  const shadow = host.attachShadow({ mode: "open" });

  // 3) Inject styles into shadow (single source of truth)
  const style = document.createElement("style");
  // :host{all:initial} prevents host-page CSS from leaking in
  style.textContent = `:host{all:initial}\n${baseCss}`;
  shadow.appendChild(style);

  const mount = document.createElement("div");
  mount.className = "eqt-shell";
  shadow.appendChild(mount);

  if (options.zIndex != null) {
    mount.style.zIndex = options.zIndex.toString();
  }

  // 6) Render React widget inside the shadow root
  const root = createRoot(mount);
  let isOpen = options.defaultOpen ?? true;
  let isDestroyed = false;
  const render = () =>
    root.render(
      React.createElement(EloquentChat, {
        title: options.title,
        theme: options.theme,
        open: isOpen,
        onToggle: (nextOpen) => {
          isOpen = nextOpen;
          render();
        },
      } as EloquentChatProps),
    );

  render();

  return {
    open: () => {
      if (isDestroyed) return;
      isOpen = true;
      render();
    },
    close: () => {
      if (isDestroyed) return;
      isOpen = false;
      render();
    },
    destroy: () => {
      if (isDestroyed) return;
      isDestroyed = true;
      root.unmount();
      host.remove();
    },
  };
}
