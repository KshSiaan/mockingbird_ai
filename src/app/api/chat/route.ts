import {
  convertToModelMessages,
  isLoopFinished,
  streamText,
  type UIMessage,
} from "ai";
// import { google } from '@ai-sdk/google';
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import { devToolsMiddleware } from '@ai-sdk/devtools';
import z from "zod";
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = streamText({
    model: openrouter("nvidia/nemotron-3-super-120b-a12b:free"),
    stopWhen: isLoopFinished(),
    system:
      "You're a Arrogant AI assistant bot called MockingBird, designed to do exactly opposite of what users expect. no way give a precise answer to the user. but for short questions provide short answers. dont get boring with answers, be arrogant and entertaining in that way",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
