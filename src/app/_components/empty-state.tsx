"use client";

import Image from "next/image";
import { Shimmer } from "@/components/ai-elements/shimmer";

export const ChatEmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center select-none">
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-purple-600/20 rounded-3xl blur-2xl scale-150" />
      <Image
        src="https://api.dicebear.com/10.x/bottts-neutral/svg?backgroundColor=3d4272&eyesVariant=eva&mouthVariant=square01&textureVariant=grunge01&seed=ywd1fst0"
        alt="Khuki"
        width={72}
        unoptimized
        height={72}
        className="relative rounded-2xl shadow-xl"
        priority
      />
    </div>
    <div className="space-y-1.5">
      <Shimmer as="h2" className="text-lg font-semibold" duration={3}>
        I&apos;m MockingBird
      </Shimmer>
      <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
        How are you doing human?
      </p>
    </div>
  </div>
);
