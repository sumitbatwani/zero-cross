# Zero Cross

A Tic-Tac-Toe game built with Next.js, TypeScript, and CSS Modules. Play against a friend locally or challenge an unbeatable AI opponent powered by the minimax algorithm.

## Features

- **2-Player mode** — pass and play on the same device
- **vs Computer mode** — minimax AI that plays optimally
- **Score tracking** — wins and draws persist across rounds
- **Dark mode** — respects system preference via CSS custom properties
- **Animations** — cell pop on mark, win highlight

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + CSS Custom Properties |
| State | `useReducer` (no external library) |
| AI | Minimax algorithm |
| Testing | Vitest |

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
  app/                    # Next.js App Router
    layout.tsx
    page.tsx              # Game page
    globals.css           # CSS custom properties (theme tokens)
  components/
    Board/                # 3x3 game grid
    Cell/                 # Individual cell with pop animation
    GameStatus/           # Turn indicator and Play Again button
    ScoreBoard/           # Score display and mode toggle
  hooks/
    useGameState.ts       # useReducer wrapper + AI trigger
  game/
    types.ts              # Shared TypeScript types
    reducer.ts            # Pure state machine
    logic.ts              # checkWinner, isBoardFull, minimax AI
    logic.test.ts         # Unit tests for game logic
```

## Deploy

The easiest way to deploy is [Vercel](https://vercel.com):

```bash
npx vercel
```

Or build a static export and host anywhere:

```bash
npm run build
```
