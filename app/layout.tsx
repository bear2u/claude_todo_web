import type { Metadata } from "next";
import "./globals.css";
import { BoardProvider } from "@/context/BoardContext";
import { ChatProvider } from "@/context/ChatContext";

export const metadata: Metadata = {
  title: "Trello Clone - Task Management & Chat",
  description: "A Trello-like task management application with real-time chat built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BoardProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </BoardProvider>
      </body>
    </html>
  );
}
