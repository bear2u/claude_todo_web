import type { Metadata } from "next";
import "./globals.css";
import { BoardProvider } from "@/context/BoardContext";

export const metadata: Metadata = {
  title: "Trello Clone - Task Management",
  description: "A Trello-like task management application built with Next.js",
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
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
