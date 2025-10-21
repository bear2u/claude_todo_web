"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Board, List, Card } from '@/types';

interface BoardContextType {
  board: Board;
  addList: (title: string) => void;
  updateList: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
  addCard: (listId: string, title: string, description?: string) => void;
  updateCard: (listId: string, cardId: string, title: string, description?: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
  moveCard: (sourceListId: string, destListId: string, sourceIndex: number, destIndex: number) => void;
  moveList: (sourceIndex: number, destIndex: number) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>({
    id: '1',
    title: 'My Trello Board',
    lists: [
      {
        id: '1',
        title: 'To Do',
        order: 0,
        cards: [
          {
            id: '1',
            title: 'Sample Task 1',
            description: 'This is a sample task',
            createdAt: new Date(),
          },
        ],
      },
      {
        id: '2',
        title: 'In Progress',
        order: 1,
        cards: [],
      },
      {
        id: '3',
        title: 'Done',
        order: 2,
        cards: [],
      },
    ],
  });

  const addList = useCallback((title: string) => {
    setBoard((prev) => {
      const newList: List = {
        id: Date.now().toString(),
        title,
        order: prev.lists.length,
        cards: [],
      };
      return {
        ...prev,
        lists: [...prev.lists, newList],
      };
    });
  }, []);

  const updateList = useCallback((listId: string, title: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: prev.lists.map((list) =>
        list.id === listId ? { ...list, title } : list
      ),
    }));
  }, []);

  const deleteList = useCallback((listId: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: prev.lists.filter((list) => list.id !== listId),
    }));
  }, []);

  const addCard = useCallback((listId: string, title: string, description?: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id === listId) {
          const newCard: Card = {
            id: Date.now().toString(),
            title,
            description,
            createdAt: new Date(),
          };
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      }),
    }));
  }, []);

  const updateCard = useCallback(
    (listId: string, cardId: string, title: string, description?: string) => {
      setBoard((prev) => ({
        ...prev,
        lists: prev.lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, title, description } : card
              ),
            };
          }
          return list;
        }),
      }));
    },
    []
  );

  const deleteCard = useCallback((listId: string, cardId: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== cardId),
          };
        }
        return list;
      }),
    }));
  }, []);

  const moveCard = useCallback(
    (sourceListId: string, destListId: string, sourceIndex: number, destIndex: number) => {
      setBoard((prev) => {
        const newLists = [...prev.lists];
        const sourceList = newLists.find((list) => list.id === sourceListId);
        const destList = newLists.find((list) => list.id === destListId);

        if (!sourceList || !destList) return prev;

        const [movedCard] = sourceList.cards.splice(sourceIndex, 1);
        destList.cards.splice(destIndex, 0, movedCard);

        return {
          ...prev,
          lists: newLists,
        };
      });
    },
    []
  );

  const moveList = useCallback((sourceIndex: number, destIndex: number) => {
    setBoard((prev) => {
      const newLists = [...prev.lists];
      const [movedList] = newLists.splice(sourceIndex, 1);
      newLists.splice(destIndex, 0, movedList);

      return {
        ...prev,
        lists: newLists.map((list, index) => ({ ...list, order: index })),
      };
    });
  }, []);

  return (
    <BoardContext.Provider
      value={{
        board,
        addList,
        updateList,
        deleteList,
        addCard,
        updateCard,
        deleteCard,
        moveCard,
        moveList,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
