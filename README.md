# Eloquent Chat Widget

## 1. Start the Agent Server

```bash
cd examples/server
cp .env.example .env # put your real OPENAI_API_KEY in .env
npm i
npm run dev # starts on http://localhost:8787 (configurable via PORT)
```

## 2. Try it via Script Tag (IIFE Demo)

Build the widget once:

```bash
npm run build
```

Open the example HTML (no server required):

```bash
open examples/openai-embed/index.html
```

## 3. Try it from Storybook (React)

Start Storybook:

```bash
npm run storybook
```

See the **Open AI** story in the Storybook interface.

# Known issues / Potential improvements

- A11y is out of scope; can be added later if desired.
