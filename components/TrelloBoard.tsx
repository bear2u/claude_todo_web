"use client";

import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TrelloList } from './TrelloList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useBoardContext } from '@/context/BoardContext';

export const TrelloBoard: React.FC = () => {
  const { board, addList, moveCard, moveList } = useBoardContext();
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      moveList(source.index, destination.index);
      return;
    }

    if (type === 'card') {
      moveCard(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">{board.title}</h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {board.lists.map((list, index) => (
                <TrelloList key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}

              <div className="flex-shrink-0">
                {isAddingList ? (
                  <div className="bg-neutral-100 rounded-lg p-3 w-[272px]">
                    <Input
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddList();
                        } else if (e.key === 'Escape') {
                          setIsAddingList(false);
                          setNewListTitle('');
                        }
                      }}
                      autoFocus
                      className="mb-2"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddList} size="sm">
                        Add List
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingList(false);
                          setNewListTitle('');
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
                    onClick={() => setIsAddingList(true)}
                    variant="ghost"
                    className="bg-white/20 hover:bg-white/30 text-white w-[272px] justify-start"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add another list
                  </Button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
