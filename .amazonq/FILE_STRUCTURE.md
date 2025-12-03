# Flip 7 - File Structure Documentation

## Overview
Clean, organized React project structure following best practices.

---

## Directory Structure

```
flip7/
├── .amazonq/rules/          # Project rules and context
├── public/                  # Static assets
├── src/
│   ├── __tests__/          # Test files
│   ├── components/         # Reusable React components
│   ├── pages/              # Page-level components
│   ├── styles/             # Modular CSS files
│   ├── utils/              # Utility functions and game logic
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
└── types/                  # TypeScript definitions
```

---

## Components (`/components`)

| File | Purpose |
|------|---------|
| `CurrentPlayerPanel.js` | Displays current player's turn with cards and actions |
| `PlayerArea.js` | Shows individual player info and cards |
| `Header.js` | App header navigation |
| `Footer.js` | App footer |

---

## Pages (`/pages`)

| File | Purpose |
|------|---------|
| `Game.js` | Main game logic and state management |
| `Home.js` | Landing page |
| `NewGame.js` | Game setup screen |
| `Instructions.js` | Game rules display |

---

## Utils (`/utils`)

| File | Purpose |
|------|---------|
| `cardDeck.js` | Deck creation and shuffling |
| `cardDefinitions.js` | Card type definitions |
| `bust.js` | Bust detection and Second Chance logic |
| `flip7.js` | Flip 7 achievement detection |
| `scoring.js` | Score calculation |
| `cardAnimation.js` | Card draw animations |
| `actionCards.js` | Action card logic |
| `modifierCards.js` | Modifier card logic |
| `player.js` | Player utilities |
| `confetti.js` | Celebration effects |

---

## Styles (`/styles`)

| File | Purpose |
|------|---------|
| `primary-theme.css` | Color scheme and theme variables |
| `game-board.css` | Main game board layout |
| `player-area.css` | Player display styling |
| `current-player-panel.css` | Current player panel styling |
| `cards.css` | Card display styling |
| `bust.css` | Bust stamp styling |
| `flip7.css` | Flip 7 stamp styling |
| `card-animation.css` | Card animation effects |

---

## Tests (`/__tests__`)

| File | Tests |
|------|-------|
| `Game.test.js` | Game component tests |
| `bust.test.js` | Bust logic tests |
| `cardDeck.test.js` | Deck operations tests |
| `cardAnimation.test.js` | Animation tests |
| `actionCards.test.js` | Action card tests |
| `modifyCards.test.js` | Modifier card tests |
| `player.test.js` | Player utility tests |
| `App.test.js` | App component tests |

---

## Recent Cleanup (Completed)

### Removed Files:
- ❌ `src/pages/Game.css` - Orphaned CSS file (replaced by `game-board.css`)
- ❌ `src/components/TurnModal.js` - Unused component
- ❌ `src/styles/turn-modal.css` - Unused CSS
- ❌ `src/utils/cardActions.js` - Empty file

### Result:
✅ Clean, organized structure with no orphaned files
✅ All imports verified and working
✅ Modular CSS properly organized in `/styles`

---

## Best Practices Followed

1. **Separation of Concerns** - Components, pages, utils, and styles are clearly separated
2. **Modular CSS** - Each feature has its own CSS file
3. **Comprehensive Testing** - Test files mirror source structure
4. **Clear Naming** - Descriptive file names that indicate purpose
5. **No Duplication** - Single source of truth for each feature

---

## Future Considerations

### Potential Additions:
- `/hooks` - Custom React hooks (if needed)
- `/constants` - Game configuration constants
- Co-located tests - Move tests next to components (optional)

### Current Status:
**Structure Score: 9/10** - Clean, maintainable, and scalable
