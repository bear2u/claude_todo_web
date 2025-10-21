# Trello Clone - Task Management App

A modern, feature-rich Trello-style task management application built with Next.js 15, TypeScript, and Shadcn UI.

![Trello Clone](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

### Full CRUD Operations
- **Lists**
  - ✅ Create new lists
  - ✅ Edit list titles
  - ✅ Delete lists

- **Cards**
  - ✅ Create new cards
  - ✅ Edit card titles and descriptions
  - ✅ Delete cards
  - ✅ Drag and drop cards within lists or between lists
  - ✅ Move cards between different lists

### UI/UX
- 🎨 Beautiful gradient background (blue to purple)
- 🖱️ Smooth drag and drop interactions
- 📱 Responsive design
- ✨ Hover effects and animations
- 🎯 Modal-based card editing
- 📜 Custom scrollbars

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Custom components with [Shadcn UI](https://ui.shadcn.com/) patterns
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd claude_todo_web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Lists
1. Click the "Add another list" button
2. Enter a list title
3. Press Enter or click "Add List"

### Managing Lists
- **Edit**: Click on the list title to edit it inline
- **Delete**: Click the trash icon in the list header

### Creating Cards
1. Click "Add a card" at the bottom of any list
2. Enter a card title
3. Press Enter or click "Add Card"

### Managing Cards
- **View/Edit**: Click on a card to open the edit modal
- **Edit**: Update title and description in the modal
- **Delete**: Click the trash icon on hover or in the modal
- **Move**: Drag and drop cards within or between lists

## Project Structure

```
claude_todo_web/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── TrelloBoard.tsx  # Main board component
│   ├── TrelloList.tsx   # List component
│   └── TrelloCard.tsx   # Card component
├── context/
│   └── BoardContext.tsx # State management
├── types/
│   └── index.ts         # TypeScript type definitions
└── lib/
    └── utils.ts         # Utility functions
```

## Build

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Development Notes

- The app uses client-side rendering for drag-and-drop functionality
- State is managed using React Context API (can be extended with localStorage for persistence)
- Hydration issues with drag-and-drop are handled using `useEffect` mounting check

## Future Enhancements

- [ ] Backend integration (API + Database)
- [ ] User authentication
- [ ] Multiple boards support
- [ ] Card labels and tags
- [ ] Due dates
- [ ] File attachments
- [ ] Activity history
- [ ] LocalStorage persistence

## License

MIT

---

Built with ❤️ using Next.js and TypeScript
