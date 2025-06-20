import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SchemaMarkup from "./components/SchemaMarkup";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HabitForge - Your Journey to Better Habits Starts Here",
  description:
    "Transform your life by tracking and breaking bad habits with our intuitive app. Join thousands of users on their journey to self-improvement.",
  keywords: [
    "habit tracker",
    "habit breaking app",
    "self-improvement app",
    "habit tracking",
    "personal development",
    "habitforge",
  ],
  authors: [{ name: "HabitForge Team" }],
  creator: "HabitForge Team",
  publisher: "HabitForge Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://habitforge.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HabitForge - Your Journey to Better Habits Starts Here",
    description:
      "Transform your life by tracking and breaking bad habits with our intuitive app. Join thousands of users on their journey to self-improvement.",
    url: "https://habitforge.app",
    siteName: "HabitForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HabitForge App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabitForge - Your Journey to Better Habits Starts Here",
    description:
      "Transform your life by tracking and breaking bad habits with our intuitive app.",
    images: ["/og-image.png"],
    creator: "@habitforgeapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Habit Forge" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#A076F9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <PerformanceOptimizer />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
