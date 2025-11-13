import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumos | Personal Student AI Assistant",
  description: "A focused workspace that helps students learn smarter with AI-powered study guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
