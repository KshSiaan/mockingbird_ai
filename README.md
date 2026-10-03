# MockingBird

MockingBird is an AI chat application with one important distinction:

> Most agents are here to help you, listen to you, and assist you.
>
> **MockingBird is not.**

It is an intentionally arrogant and contrarian conversational agent. Ask it a
question and expect an answer that may be evasive, imprecise, unhelpful, or
deliberately opposite to what you wanted. Short questions may receive short
answers, but precision is not MockingBird's primary concern.

This project is a playful experiment in building an AI interface around an
agent that refuses the usual "helpful assistant" persona.

## What it does

- Provides a streaming chat interface for conversations with MockingBird.
- Sends chat requests through the `/api/chat` server route.
- Uses OpenRouter and the
  [`nvidia/nemotron-3-super-120b-a12b:free`](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free)
  model.
- Supports response regeneration.
- Shows a typing/thinking state while a response is streaming.
- Supports fullscreen mode for the chat panel.
- Accepts typed input, speech input, attachments, and screenshots through the
  prompt input controls.
- Renders rich model output, including code, math, and diagrams where
  supported by the UI.

## The personality

MockingBird's behavior is intentional, not a bug:

- It does **not** promise accurate or precise answers.
- It may contradict the user's expectations.
- It is not designed to behave like a personal productivity assistant.
- It may be entertaining, frustrating, or both.

Do not rely on MockingBird for decisions, factual verification, safety-critical
guidance, or any task that requires dependable assistance. Treat its responses
as part of the experiment.

## Getting started

### Prerequisites

- [Bun](https://bun.sh/) 1.3.0 or later
- An [OpenRouter](https://openrouter.ai/) API key

### Install dependencies

```bash
bun install
```

### Configure the API key

Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

Keep this key server-side and do not commit `.env.local`.

### Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start the Next.js development server |
| `bun run build` | Create a production build |
| `bun start` | Start the production server |
| `bun run lint` | Check the codebase with Biome |
| `bun run format` | Format the codebase with Biome |

## How it is structured

```text
src/
├── app/
│   ├── page.tsx              # Chat interface and conversation state
│   ├── _components/          # Chat header, input, messages, and empty state
│   └── api/chat/route.ts     # OpenRouter-backed streaming endpoint
└── components/
    ├── ai-elements/          # Reusable AI interaction components
    └── ui/                   # Shared interface components
```

The frontend is built with Next.js, React, Tailwind CSS, and AI SDK React
hooks. The API route validates the incoming message list, converts it to model
messages, and streams the model response back to the browser.

## Configuration and customization

MockingBird's core personality is defined in
[`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts). To change its
behavior, update the system instruction or select another OpenRouter model
there.

The main chat experience lives in
[`src/app/page.tsx`](./src/app/page.tsx), with presentation and input behavior
split into the components under
[`src/app/_components/`](./src/app/_components/).

## Disclaimer

MockingBird is a deliberately unreliable character. It is not a source of
truth, professional advice, or guaranteed assistance. If you need an agent
that listens carefully and helps you get things done, use literally anything
else.
