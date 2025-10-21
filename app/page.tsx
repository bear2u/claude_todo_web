import { TrelloBoard } from "@/components/TrelloBoard";
import { ChatRoom } from "@/components/ChatRoom";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Trello Board */}
      <div className="flex-1 overflow-auto">
        <TrelloBoard />
      </div>

      {/* Right Side - Chat Room */}
      <div className="w-96 border-l border-neutral-300 flex-shrink-0">
        <ChatRoom />
      </div>
    </div>
  );
}
