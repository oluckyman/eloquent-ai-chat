# Eloquent AI Chat

Embeddable chat widget that works as:

- a **React component** you can import in any React app, and
- a **script‑tag embed (IIFE)** that drops into any website with minimal code.

## Features

- Floating launcher + chat panel (responsive; full‑screen sheet on small screens)
- Basic chat flow with a pluggable **Agent** (mock agent by default; optional OpenAI proxy)
- **Status pill** (online/offline) and **Maintenance mode** (blocks input)
- Theming via CSS variables (font, brand colors, radius, shadow)

---

## Run locally (Storybook)

```bash
npm i
npm run storybook
```

## Script‑tag (IIFE) Demo — `examples/vanilla-embed`

A zero‑setup HTML page that loads the bundled script and calls `EloquentChat.init(...)`.

```bash
# build the IIFE bundle (creates dist/eloquent-chat.global.js)
npm run build

# open the demo (choose one)
# macOS/Linux
open examples/vanilla-embed/index.html
# Windows (PowerShell)
start .\examples\vanilla-embed\index.html

# or run a tiny static server (any OS)
npx http-server examples/vanilla-embed -p 8080
```

The page demonstrates custom theming and programmable open/close/destroy functionality.

## Use in a new React app (quick consumer setup)

```bash
# in another folder
npm create vite@latest widget-consumer -- --template react-ts
cd widget-consumer
npm i eloquent-ai-chat
```

Then update your app:

```tsx
// src/App.tsx
import { EloquentChat } from "eloquent-ai-chat";
export default function App() {
  return <EloquentChat title="Hello" />;
}
```

Run it:

```bash
npm run dev
```

## Optional: OpenAI Agent (example backend)

This repo includes a tiny Express server that proxies chat turns to OpenAI. Run it locally, then point the widget to it via `agentUrl`.

```bash
cd examples/server
cp .env.example .env   # put your real OPENAI_API_KEY here
npm i
npm run dev            # starts http://localhost:8787 by default
```

The widget will POST `{ messages: [{ role, content, ts }] }` to `/api/agent` and expect `{ reply: string }`.

---

## Theming (CSS variables)

All styling is driven by CSS variables on the root. You can set them via the `theme` prop (React) or `init({ theme })` (IIFE), or override them in your own CSS.

Example (React):

```tsx
<EloquentChat
  theme={{
    font: "Geist, Arial, sans-serif",
    primary: "rgb(111, 51, 183)",
    primaryHover: "rgb(235, 108, 82)",
    radius: "16px",
  }}
/>
```

Example (IIFE): see `examples/vanilla-embed/index.html`.

---

## Notes

- IIFE vs React styling: the IIFE build runs inside Shadow DOM (host CSS can’t affect it). The React package is intentionally exposed to host CSS so teams can theme/override. It ships with a default theme, but in host apps it may look slightly different.
- `theme.camelCase` props map to `--eqt-kebab-case` variables on `.eqt-root` (e.g. `theme.primaryHover` → `--eqt-primary-hover`). The `Theme` type includes the common vars, extend as needed;
- Both builds share one `base.css`. For React we auto‑inject via tsup (`loader: { '.css': 'css' }` + `injectStyle: true`). For the IIFE we load the same CSS as text and inject it into the Shadow DOM. Consumers don’t need a separate CSS import.
- Mobile view stretches the panel to the viewport and shows a header close button.
- Accessibility (a11y) is intentionally minimal for the assignment; can be added later.
