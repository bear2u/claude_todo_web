"use client";

import React, { useState } from 'react';
import { List } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import { TrelloCard } from './TrelloCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Pencil, Trash2 } from 'lucide-react';
import { useBoardContext } from '@/context/BoardContext';

interface TrelloListProps {
  list: List;
  index: number;
}

export const TrelloList: React.FC<TrelloListProps> = ({ list, index }) => {
  const { addCard, updateCard, deleteCard, updateList, deleteList } = useBoardContext();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle);
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleUpdateTitle = () => {
    if (listTitle.trim()) {
      updateList(list.id, listTitle);
      setIsEditingTitle(false);
    } else {
      setListTitle(list.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="bg-neutral-100 rounded-lg p-3 w-[272px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
            {isEditingTitle ? (
              <Input
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTitle();
                  } else if (e.key === 'Escape') {
                    setListTitle(list.title);
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className="h-8 font-semibold text-sm px-2"
              />
            ) : (
              <h3
                className="font-semibold text-sm px-2 py-1.5 flex-1 cursor-pointer hover:bg-neutral-200 rounded"
                onClick={() => setIsEditingTitle(true)}
              >
                {list.title}
              </h3>
            )}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-neutral-200"
                onClick={() => setIsEditingTitle(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-neutral-200 text-red-600"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this list?')) {
                    deleteList(list.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[4px] ${
                  snapshot.isDraggingOver ? 'bg-blue-100 rounded-md' : ''
                }`}
              >
                {list.cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                    onUpdate={(cardId, title, description) =>
                      updateCard(list.id, cardId, title, description)
                    }
                    onDelete={(cardId) => deleteCard(list.id, cardId)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {isAddingCard ? (
            <div className="mt-2">
              <Input
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter card title..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCard();
                  } else if (e.key === 'Escape') {
                    setIsAddingCard(false);
                    setNewCardTitle('');
                  }
                }}
                autoFocus
                className="mb-2"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddCard} size="sm">
                  Add Card
                </Button>
                <Button
                  onClick={() => {
                    setIsAddingCard(false);
                    setNewCardTitle('');
                  }}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsAddingCard(true)}
              variant="ghost"
              className="w-full justify-start text-neutral-600 hover:bg-neutral-200 mt-2"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a card
            </Button>
          )}
    </div>
  );
};
