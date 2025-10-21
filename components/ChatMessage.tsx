"use client";

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col mb-4',
        isOwnMessage ? 'items-end' : 'items-start'
      )}
    >
      {!isOwnMessage && (
        <div className="text-xs text-neutral-600 mb-1 px-1">{message.username}</div>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2 break-words',
          isOwnMessage
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-neutral-200 text-neutral-900 rounded-bl-sm'
        )}
      >
        <p className="text-sm">{message.message}</p>
      </div>
      <div className="text-xs text-neutral-500 mt-1 px-1">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};
