# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CharaVerse is an OC (Original Character) management system and card display application built with React 19 + TypeScript. The project uses a staged development approach where each stage is independently functional.

**Current Stage**: Stage 3 - Data Service Layer (Completed)
**Next Stage**: Stage 4 - OC List Page

## Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Type check + production build
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # ESLint check
```

## Architecture Overview

### Data Model Hierarchy

The Character interface (`src/types/character.ts`) is the central data model with 11 main parts:

1. **basic**: BasicProfile - ID, names, nicknames, gender, dates, creator, schema version
2. **appearance**: Appearance - body, face, hair, facialMarks, accessories
3. **wardrobe**: Wardrobe - outfits, mainAccessories, signatureWeapon
4. **personality**: Personality - mbti, zodiac, coreDescription, traits, motivation, psychology, expression
5. **background**: Background - birthplace, currentResidence, family, education, significantEvents
6. **skills**: Skills - occupation, skills array, weaknesses, limitations
7. **relationships**: Relationships - connections array
8. **lore**: Lore - worldSetting, timeline, importantItems, secrets, legends
9. **additionalInfo**: AdditionalInfo - hobbies, habits, goals, values, notes
10. **media**: MediaAssets - profileImage, gallery, voiceClaim, themeSong
11. **metadata**: Metadata - tags, isPublic, isNSFW, language, contentWarnings

**Key Type Locations**:
- Enums and basic types: `src/types/enums.ts`
- Character interfaces: `src/types/character.ts`
- Zod schemas: `src/schemas/character.schema.ts`
- Type utilities: `src/types/utils.ts`

### Routing Architecture

**React Router v7 Configuration** (`src/router/index.tsx`):
- **Lazy Loading**: All page components use `lazy()` for code splitting
- **Suspense Boundaries**: Each route wrapped in `Suspense` with loading fallback
- **Error Boundaries**: Custom error boundary for page loading failures
- **Route Structure**:
  - `/` → OC List Page (main page)
  - `/characters/:id` → OC Detail Page
  - `/home` → Home Page (reserved)
  - `/components` → Component Showcase
  - `/data-demo` → Data Service Demo

**Key Pattern**: Always use `@/` path alias, avoid relative imports like `../../components/Button`

### Service Layer Architecture

**Data Flow**: Component → Zustand Store → CharacterService → LocalStorageAdapter → LocalStorage

```
src/services/
├── characterService.ts          # Main service with CRUD operations
└── storage/
    └── localStorageAdapter.ts   # LocalStorage persistence layer
```

**CharacterService** (`src/services/characterService.ts`):
- **Singleton pattern**: `export const characterService = new CharacterService()`
- **Custom error class**: `CharacterServiceError` with error codes:
  - `VALIDATION_ERROR`: Zod validation failed
  - `NOT_FOUND`: Character not found
  - `STORAGE_ERROR`: LocalStorage operation failed
  - `UNKNOWN_ERROR`: Unexpected error
- **Type safety**: Uses `getCharacterIdSafe()` helper to avoid `any` type
- **Batch operations**: Supports bulk import/export with success/failure statistics
- **Mock data initialization**: `initializeFromMockData()` avoids overwriting existing data

**Key Methods**:
- `loadCharacters()`: Loads all characters, automatically filters invalid data
- `loadCharacter(id)`: Loads single character, handles NOT_FOUND errors
- `saveCharacter(character)`: Saves character with automatic Zod validation
- `deleteCharacter(id)`: Deletes character, checks existence first
- `safeValidateCharacter()`: Safe validation returning result object instead of throwing

**LocalStorageAdapter** (`src/services/storage/localStorageAdapter.ts`):
- **Singleton pattern**: `export const localStorageAdapter = new LocalStorageAdapter()`
- **Storage strategy**:
  - Individual characters: `charaverse_character_{id}`
  - Character index: `charaverse_characters_list` (array of IDs)
- **Async interface**: All methods are async for future API compatibility
- **Data consistency**: Save/delete operations automatically update the index
- **Error handling**: All operations wrapped in try-catch with proper error messages

### State Management

**Zustand Store** (`src/stores/characterStore.ts`):
```typescript
interface CharacterStoreState {
  // State
  characters: Character[]
  currentCharacter: Character | null
  loading: boolean
  error: string | null

  // Actions
  loadCharacters: () => Promise<void>
  loadCharacter: (id: string) => Promise<void>
  saveCharacter: (character: Character) => Promise<void>
  deleteCharacter: (id: string) => Promise<void>
  setCurrentCharacter: (character: Character | null) => void
  clearError: () => void
  initializeFromMockData: (mockCharacters: Character[]) => Promise<void>
}
```

**Key Patterns**:
- **Dependency Injection**: Store depends on `characterService` for data operations
- **Loading State Management**: All async actions set `loading: true/false`
- **Error Handling**: Errors are caught, stored in `error` state, and re-thrown
- **State Synchronization**: Save/delete operations automatically update local state
- **Mock Data Support**: `initializeFromMockData()` for development and testing

**Usage Pattern**:
```typescript
import { useCharacterStore } from '@/stores/characterStore'

const { characters, loading, error, loadCharacters } = useCharacterStore()

// In component
useEffect(() => {
  loadCharacters()
}, [loadCharacters])
```

### Component System

**Component Categories**:
- **Base Components**: Button, Card, Input, Tag (with CSS Modules)
- **Business Components**: OCCardPreview, SearchBar, FilterPanel, OCGrid
- **Page Components**: OCListPage, OCDetailPage, ComponentShowcase, DataServiceDemo

**Component Structure Pattern**:
Each component follows this structure:
```
src/components/ComponentName/
├── ComponentName.tsx           # Component implementation
├── ComponentName.module.css    # CSS Modules styles
├── ComponentName.types.ts      # TypeScript type definitions
└── index.ts                    # Unified export
```

**Component Pattern**:
```typescript
import { FC } from 'react'
import styles from './ComponentName.module.css'
import { ComponentNameProps } from './ComponentName.types'

export const ComponentName: FC<ComponentNameProps> = ({ prop1 }) => {
  return <div className={styles.container}>...</div>
}
```

**Unified Export Pattern** (`src/components/index.ts`):
```typescript
// Component exports
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
export { Tag } from './Tag'

// Type exports
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'
export type { CardProps } from './Card'
export type { InputProps } from './Input'
export type { TagProps, TagVariant } from './Tag'
```

### Design System

**CSS Variables** (`src/styles/variables.css`):
- Color system: primary (600-50), secondary, success, warning, error, neutral
- Typography: font families, sizes, weights, line heights
- Spacing: 0.25rem to 4rem scale
- Effects: shadows, transitions, z-index layers

**Global Styles** (`src/styles/global.css`):
- CSS Reset
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)

## Important Patterns

### Path Aliases

Always use `@/` instead of relative imports:
```typescript
// Correct
import { Button } from '@/components/Button'
import type { Character } from '@/types/character'

// Incorrect
import { Button } from '../../components/Button'
```

**Configuration**: Path alias `@` is configured in `vite.config.ts` to point to `./src`

### TypeScript Configuration

- **Application Code**: `tsconfig.app.json` with `resolveJsonModule: true` for JSON imports
- **Build Tooling**: `tsconfig.node.json` for Vite and other Node.js tools
- **Testing**: `tsconfig.test.json` for Vitest configuration
- **Important**: `erasableSyntaxOnly: true` is enabled - avoid parameter properties in constructors

### Data Validation Pattern

**Zod Schema Architecture** (`src/schemas/character.schema.ts`):
- **Complete 11-part schema**: Each Character part has corresponding Zod schema
- **Type safety**: Use `z.infer<>` to automatically generate TypeScript types
- **Validation utilities**:
  - `validateCharacter()`: Strict validation, throws on failure
  - `safeValidateCharacter()`: Safe validation, returns result object
  - `createDefaultCharacterInput()`: Creates default character input data

**Usage Pattern**:
```typescript
import { safeValidateCharacter } from '@/schemas/character.schema'

const validation = safeValidateCharacter(data)
if (validation.success && validation.data) {
  // Use validation.data (type: Character)
} else {
  // Handle validation.error (type: z.ZodError | undefined)
}
```

### Avoiding `any` Type

**Type Safety Patterns**:
1. **Type Guards**: Use `typeof`, `instanceof`, or custom type guards
2. **Type Assertions**: Use `as` with proper type narrowing
3. **Unknown First**: Accept `unknown` instead of `any` for external data

**Example from characterService.ts**:
```typescript
function getCharacterIdSafe(value: unknown): string {
  if (typeof value !== 'object' || value === null) return 'unknown'
  const obj = value as Record<string, unknown>
  const basic = obj['basic']
  // ... further type narrowing
}
```

### Error Handling Pattern

**Custom Error Class** (`src/services/characterService.ts`):
```typescript
class CharacterServiceError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'STORAGE_ERROR' | 'UNKNOWN_ERROR'
  ) {
    super(message)
    this.name = 'CharacterServiceError'
  }
}
```

**Error Handling Strategy**:
1. **Service Layer**: Throws `CharacterServiceError` with specific error codes
2. **Store Layer**: Catches errors, stores in state, and re-throws
3. **Component Layer**: Displays error messages and provides retry options

### Design Patterns Applied

1. **Singleton Pattern**: Service and Adapter layers (`characterService`, `localStorageAdapter`)
2. **Adapter Pattern**: `LocalStorageAdapter` for storage abstraction
3. **Dependency Injection**: Store depends on Service for data operations
4. **Factory Pattern**: `createDefaultCharacterInput()` creates default data
5. **Strategy Pattern**: Validation strategies (strict vs safe validation)

## Mock Data

Mock characters are stored in `data/characters/`:
- char-001.json: Aria Morningstar (cyberpunk security expert)
- char-002.json: Silas Nightwind (elf ranger)
- char-003.json: Lia Dawn (mage apprentice)

All mock data follows the complete Character interface structure based on `data/characters/example.json`.

## Code Style

- **No emojis or decorative symbols** in code comments, logs, or UI text
- **Professional tone**: Technical, concise comments in Chinese
- **TypeScript strict mode**: No `any`, explicit types where needed
- **Component organization**: Single responsibility, CSS Modules for styling
- **Testing**: Tests in `/tests/` directory, use Vitest

## Staged Development Workflow

1. **Stage Planning**: Reference `docs/IMPLEMENTATION_PLAN.md` for current stage tasks
2. **Implementation**: Follow patterns from completed stages in `docs/COMPLETED_STAGES.md`
3. **Verification**: Run `npm run build` to ensure type safety
4. **Documentation**: Update stage completion records when finished

Each stage builds on previous stages and must be independently runnable.

## Key Documentation

- `docs/PROJECT.md`: Complete project requirements and OC data structure (11 parts detailed)
- `docs/IMPLEMENTATION_PLAN.md`: 10-stage development roadmap
- `docs/COMPLETED_STAGES.md`: Completed stage records with verification results
- `.claude/CLAUDE.md`: Detailed development guide with coding standards

## Type Safety Notes

**Common Field Mappings**:
- Use `character.basic` (not `basicProfile`)
- Use `character.skills.occupation` (not `profession`)
- Use `character.media` (not `mediaAssets`)
- Traits are objects: `{ name: string, description: string, isPositive: boolean, intensity: number }`

**Required Interface Fields**:
- Appearance must include: body, face, hair, facialMarks, accessories
- Personality must include: coreDescription, motivation, psychology, expression
- All nested objects must match their interface definitions exactly

## Technology Stack

**Core Dependencies**:
- **React 19**: Latest React version with concurrent features
- **TypeScript**: Strict type checking with no `any` types
- **Vite**: Fast build tool with hot module replacement
- **React Router v7**: Latest routing with lazy loading support
- **Zustand**: Lightweight state management
- **Zod**: Runtime type validation with TypeScript integration

**Utility Libraries**:
- **date-fns**: Date manipulation and formatting
- **lodash-es**: Utility functions (tree-shakable ES module version)
- **lucide-react**: Icon library
- **uuid**: UUID generation for character IDs

**Development Tools**:
- **Vitest**: Testing framework with React Testing Library
- **ESLint**: Code linting with TypeScript support
- **Testing Library**: Component testing utilities

## Build and Development

**Vite Configuration** (`vite.config.ts`):
- Path alias: `@` → `./src`
- React plugin: `@vitejs/plugin-react`
- Type checking: `tsc -b` in build script

**Development Workflow**:
1. **Stage Planning**: Reference `docs/IMPLEMENTATION_PLAN.md` for current stage
2. **Implementation**: Follow patterns from completed stages
3. **Type Checking**: Run `npm run build` to ensure type safety
4. **Testing**: Run `npm run test` for unit tests
5. **Linting**: Run `npm run lint` for code quality
6. **Documentation**: Update stage completion records

**Key Development Principles**:
1. **No `any` types**: Use proper type guards and assertions
2. **Chinese comments**: Professional technical documentation in Chinese
3. **Component modularity**: Single responsibility, CSS Modules for styling
4. **Error handling**: Custom error classes with specific error codes
5. **Data validation**: Zod schemas for runtime type safety
