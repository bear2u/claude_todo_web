export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
}

export interface ChatUser {
  name: string;
  userId: string;
}
