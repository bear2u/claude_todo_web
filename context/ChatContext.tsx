"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ChatMessage, ChatUser } from '@/types/chat';

interface ChatContextType {
  messages: ChatMessage[];
  currentUser: ChatUser | null;
  setCurrentUser: (user: ChatUser) => void;
  sendMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

const STORAGE_KEY_MESSAGES = 'trello_chat_messages';
const STORAGE_KEY_USER = 'trello_chat_user';

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUserState] = useState<ChatUser | null>(null);

  // Load messages from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (storedMessages) {
        try {
          const parsed = JSON.parse(storedMessages);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(messagesWithDates);
        } catch (e) {
          console.error('Failed to parse messages from localStorage', e);
        }
      }

      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        try {
          setCurrentUserState(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
        }
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    }
  }, [messages]);

  // Listen for localStorage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_MESSAGES && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const messagesWithDates = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(messagesWithDates);
        } catch (err) {
          console.error('Failed to parse messages from storage event', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setCurrentUser = useCallback((user: ChatUser) => {
    setCurrentUserState(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!currentUser || !message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random(),
      userId: currentUser.userId,
      username: currentUser.name,
      message: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentUser,
        setCurrentUser,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
