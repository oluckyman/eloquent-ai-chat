# Eloquent.ai Chat

## Test the React Component in Storybook

```bash
# install deps
npm i

# run Storybook (visual test)
npm run storybook
```

## Script-tag (IIFE) Demo — `examples/vanilla-embed`

This is an example of how you can use the widget via a script tag.

```bash
# build the bundle (creates `dist/eloquent-chat.global.js`):
npm run build
# open HTML file in browser
open examples/vanilla-embed/index.html
```

The page demonstrates custom theming and programmable open/close/destroy functionality.

## Publish the npm Package Locally

```bash
# build the library + iife
npm run build
# create a local tarball
npm pack
# → outputs something like: eloquent-chat-widget-0.0.1.tgz
```

## Test in a Fresh App (Optional)

```bash
# in another folder
npm create vite@latest widget-consumer -- --template react-ts
cd widget-consumer
npm i
npm i ../path/to/eloquent-chat-widget-0.0.1.tgz
```

Then update your app component:

```tsx
// widget-consumer/src/App.tsx
import { EloquentChat } from "eloquent-chat-widget";

export default function App() {
  return <EloquentChat title="Hello" />;
}
```

## OpenAI Agent Testing

### 1. Start the Agent Server

```bash
cd examples/server
cp .env.example .env # put your real OPENAI_API_KEY in .env
npm i
npm run dev # starts on http://localhost:8787 (configurable via PORT)
```

### 2. Try it via Script Tag (IIFE Demo)

Build the widget once:

```bash
npm run build
```

Open the example HTML (no server required):

```bash
open examples/openai-embed/index.html
```

### 3. Try it from Storybook (React)

Start Storybook:

```bash
npm run storybook
```

See the **Open AI** story in the Storybook interface.

## Known Issues / Potential Improvements

- A11y is out of scope; can be added later if desired.
