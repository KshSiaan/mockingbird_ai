"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { PromptInputProvider } from "@/components/ai-elements/prompt-input";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ChatHeader } from "./_components/chat-header";
import { ChatEmptyState } from "./_components/empty-state";
import { ChatMessageRow, BotTypingRow } from "./_components/chat-message";
import { ChatInput } from "./_components/chat-input";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InfoIcon, MaximizeIcon, MinimizeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Page() {
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === chatPanelRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement === chatPanelRef.current) {
      await document.exitFullscreen();
      return;
    }

    await chatPanelRef.current?.requestFullscreen();
  }, []);

  const { messages, sendMessage, status, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const sendWithConfig = useCallback(
    (message: { text: string }) => {
      sendMessage(message);
    },
    [sendMessage],
  );
  const isStreaming = status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const showTypingRow = isStreaming && lastMessage?.role === "user";

  return (
    <main className="px-4 h-dvh py-4 flex items-start gap-4 container mx-auto">
      <a
        href="https://www.buymeacoffee.com/raven36"
        className="absolute top-4 right-4 z-50 w-34"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=raven36&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
          alt="Buy me a coffee"
          unoptimized
          width={235}
          height={60}
        />
      </a>
      <section className="w-1/2 h-full border rounded-lg hidden" />
      <div
        ref={chatPanelRef}
        className={`flex-1 h-full flex flex-col rounded-xl bg-background overflow-hidden ${
          isFullscreen ? "p-3 md:p-6" : ""
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <ChatHeader status={status} />
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <InfoIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle>Notice</PopoverTitle>
                  <PopoverDescription>
                    AI-generated responses may occasionally be direct, blunt, or
                    otherwise inappropriate in tone. Such wording is generated
                    automatically, is not intended to offend or target any
                    individual, and should not be interpreted as a personal
                    statement, professional advice, or the views of the service
                    provider. Please evaluate AI responses critically and report
                    any response you believe is abusive, discriminatory,
                    threatening, or otherwise inappropriate.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/KshSiaan/mockingbird_ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>GithubIcon</title>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </Button>
          </div>
        </div>

        <Conversation className="min-h-0">
          <ConversationContent className="gap-4 py-4 px-3">
            {messages.length === 0 && !isStreaming && <ChatEmptyState />}
            {messages.map((message, i) => (
              <ChatMessageRow
                key={message.id}
                message={message}
                isLast={i === messages.length - 1}
                status={status}
                onRegenerate={regenerate}
              />
            ))}
            {showTypingRow && <BotTypingRow />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="p-3 bg-background/95 shrink-0">
          <PromptInputProvider>
            <ChatInput status={status} onSubmit={sendWithConfig} />
          </PromptInputProvider>
        </div>
      </div>
    </main>
  );
}
