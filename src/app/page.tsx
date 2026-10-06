"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { InfoIcon, MaximizeIcon, MenuIcon, MinimizeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { PromptInputProvider } from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatHeader } from "./_components/chat-header";
import { ChatInput } from "./_components/chat-input";
import { BotTypingRow, ChatMessageRow } from "./_components/chat-message";
import { ChatEmptyState } from "./_components/empty-state";

export default function Page() {
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

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
    <main className="container mx-auto flex h-dvh items-start gap-4 px-2 py-2 sm:px-4 sm:py-4">
      <section className="w-1/2 h-full border rounded-lg hidden" />
      <div
        ref={chatPanelRef}
        className={`flex-1 h-full flex flex-col rounded-xl bg-background overflow-hidden ${
          isFullscreen ? "p-3 md:p-6" : ""
        }`}
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-1">
          <ChatHeader status={status} />
          <div className="flex shrink-0 items-center">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Open menu">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="max-h-[85dvh] overflow-y-auto"
              >
                <SheetHeader className="hidden">
                  <SheetTitle>MockingBird menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-5 px-4 py-8">
                  <div className="flex items-center justify-between gap-4">
                    <a
                      href="https://www.buymeacoffee.com/raven36"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buy me a coffee"
                    >
                      <Image
                        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=raven36&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
                        alt="Buy me a coffee"
                        unoptimized
                        width={235}
                        height={60}
                        className="h-auto w-[180px]"
                      />
                    </a>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href="https://github.com/KshSiaan/mockingbird_ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open MockingBird on GitHub"
                        >
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.05.14 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
                          </svg>
                        </Link>
                      </Button>
                      <Button
                        variant={showNotice ? "secondary" : "ghost"}
                        size="icon"
                        type="button"
                        onClick={() => setShowNotice((visible) => !visible)}
                        aria-label="Show notice"
                        aria-expanded={showNotice}
                      >
                        <InfoIcon />
                      </Button>
                    </div>
                  </div>
                  {showNotice && (
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <h2 className="font-medium text-foreground">Notice</h2>
                      <p>
                        AI-generated responses may occasionally be direct,
                        blunt, or otherwise inappropriate in tone. Such wording
                        is generated automatically, is not intended to offend or
                        target any individual, and should not be interpreted as
                        a personal statement, professional advice, or the views
                        of the service provider.
                      </p>
                      <p>
                        Please evaluate AI responses critically and report any
                        response you believe is abusive, discriminatory,
                        threatening, or otherwise inappropriate.
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
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
