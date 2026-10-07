import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const fontSans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://mockingbirdai.vercel.app";
const title = "MockingBird: The Arrogant AI That Refuses to Help";
const description =
  "Tired of polite chatbots? MockingBird is an unapologetically arrogant AI built for entertainment. Ask it anything and see how unhelpful it can get.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | MockingBird",
  },
  description,
  applicationName: "MockingBird",
  keywords: [
    "arrogant AI",
    "funny chatbot",
    "sarcastic AI",
    "AI for fun",
    "MockingBird",
    "anti-assistant",
  ],
  authors: [{ name: "KshSiaan", url: "https://github.com/KshSiaan" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MockingBird",
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "MockingBird",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3d4272",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className={`${fontSans.className} antialiased`}>{children}</body>
    </html>
  );
}
