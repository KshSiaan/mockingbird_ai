"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  status: string;
}

export const ChatHeader = ({ status }: ChatHeaderProps) => {
  const isThinking = status === "streaming";

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden bg-background/95 px-2 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:gap-3 sm:px-4">
      <div className="relative shrink-0">
        <Image
          src="https://api.dicebear.com/10.x/bottts-neutral/svg?backgroundColor=3d4272&eyesVariant=eva&mouthVariant=square01&textureVariant=grunge01&seed=ywd1fst0"
          alt="Khuki"
          width={38}
          height={38}
          unoptimized
          className="rounded-xl shadow-sm"
          priority
        />
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background transition-colors duration-300",
            isThinking ? "bg-amber-400 animate-pulse" : "bg-emerald-400",
          )}
        />
      </div>
      <div className="min-w-0 truncate">
        <div className="font-semibold text-sm leading-none">MockingBird</div>
        <div
          className={cn(
            "mt-0.5 truncate text-xs transition-colors duration-300",
            isThinking
              ? "text-amber-500 dark:text-amber-400"
              : "text-muted-foreground",
          )}
        >
          {isThinking
            ? "Thinking..."
            : "Your not so Personal AI Assistant · Online"}
        </div>
      </div>
    </div>
  );
};
