"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { ChatMessage } from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export const ChatRoom: React.FC = () => {
  const { messages, currentUser, setCurrentUser, sendMessage } = useChatContext();
  const [messageInput, setMessageInput] = useState('');
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputFocus = () => {
    if (!currentUser) {
      setShowNameDialog(true);
    }
  };

  const handleSendMessage = () => {
    if (!currentUser) {
      setShowNameDialog(true);
      return;
    }
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleSetName = () => {
    if (nameInput.trim()) {
      setCurrentUser({
        name: nameInput.trim(),
        userId: Date.now().toString() + Math.random(),
      });
      setShowNameDialog(false);
      setNameInput('');
    }
  };

  const handleChangeName = () => {
    setShowNameDialog(true);
    setNameInput(currentUser?.name || '');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Chat Room</h2>
        {currentUser && (
          <button
            onClick={handleChangeName}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="text-sm">{currentUser.name}</span>
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOwnMessage={currentUser?.userId === msg.userId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 p-4">
        <div className="flex gap-2">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={currentUser ? "Type a message..." : "Click to enter your name and start chatting..."}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Name Input Dialog */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Chat Room!</DialogTitle>
            <DialogDescription>
              Please enter your name to start chatting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSetName();
                }
              }}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button onClick={handleSetName} disabled={!nameInput.trim()}>
                Start Chatting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
