import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sandheepgopinath.com"),
  title: "Sandheep Gopinath — Product Leader | How I Think",
  description:
    "Sandheep Gopinath — product leader connecting organizational purpose, customer needs, and technology to build valuable enterprise products.",
  keywords: [
    "Sandheep Gopinath",
    "Product Leader",
    "Product Manager",
    "Enterprise SaaS",
    "0 to 1 Products",
    "AI Products",
    "Verint",
    "HRS Group",
    "Danfoss",
    "Synapse Technologies",
    "How I Think",
  ],
  authors: [{ name: "Sandheep Gopinath", url: "https://sandheepgopinath.com" }],
  openGraph: {
    title: "Sandheep Gopinath — Product Leader | How I Think",
    description:
      "Connecting organizational purpose, customer needs, and technology to build valuable enterprise products.",
    url: "https://sandheepgopinath.com",
    siteName: "Sandheep Gopinath",
    images: [
      {
        url: "/profile.jpeg",
        width: 400,
        height: 400,
        alt: "Sandheep Gopinath",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top" className="antialiased selection:bg-[#cfdacb]">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
