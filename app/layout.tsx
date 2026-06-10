import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppNav } from "@/components/AppNav";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";

export const metadata: Metadata = {
  title: "Polish Family Tutor",
  description: "Local-first family Polish learning app",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Polish Tutor",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#5e7a5b",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RegisterServiceWorker />
        {children}
        <AppNav />
      </body>
    </html>
  );
}
